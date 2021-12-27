import { HttpException, Injectable } from '@nestjs/common'
import * as client from '@daostack/client'
import { IProposalState, Proposal } from '@daostack/client'
import { CreateAnnouncementPayload, ProposalResponse } from './interfaces'
import { default as axios } from 'axios'
import { GLOBAL_ID_BASE_URL as svcUrl } from '../../conf'
import { GroupDaoRepository } from './group-dao.repository'
import { GroupDaoEntity } from './entities/group-dao.entity'
import { CreateProposal } from './dto/create-group-dao.dto'
import { GroupDaoProposalRepository } from './group-dao-proposal.repository'
import { skipWhile, timeout } from 'rxjs'

const utils = client.utils

@Injectable()
export class GroupDaoService {
  constructor(
    private groupDaoRepository: GroupDaoRepository,
    private groupDaoProposalRepository: GroupDaoProposalRepository,
  ) {}

  async createGroupDao(group_uuid: string, access_token): Promise<void> {
    const arc: client.Arc = this.arcInstance()
    await arc.fetchContractInfos()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const daos = await arc.daos().first()
    const groupDao = new GroupDaoEntity()
    groupDao.group_uuid = group_uuid
    groupDao.dao_uuid = daos[0].id

    try {
      await this.groupDaoRepository.create(groupDao)
      const announcementMessage: CreateAnnouncementPayload = {
        markdown: `**This group has been converted to a DAO**
      *To see the DAO on Ethereum, click on this link https://ethplorer.io/tx/0x123456%20Ethplorer*\n`,
      }

      await this.createAnnouncement(access_token, announcementMessage, group_uuid)
    } catch (e) {
      console.log(e)
    }
  }

  async createProposal(createProposal: CreateProposal, access_token): Promise<ProposalResponse> {
    const arc: client.Arc = this.arcInstance()
    await arc.fetchContractInfos()

    // we get the first returned item from the obervable that returns a list of DAOs
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const daos = await arc.daos().first()
    const dao = daos[0]
    const schemes = await dao.schemes({ where: { name: 'ContributionReward' } }).first()

    if (schemes.length === 0) {
      throw Error('Something went wrong - no ContributionReward scheme was registered with this DAO')
    }

    const schemeState = await schemes[0].state().first()
    // Send Transaction to create new proposal
    const p = await dao
      .createProposal({
        description: `Change group ${createProposal.proposal_type}`,
        title: createProposal.proposal_type,
        url: `${createProposal.base_url}`,
        scheme: schemeState.address,
        beneficiary: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
        nativeTokenReward: '',
        reputationReward: utils.toWei('100'),
        ethReward: utils.toWei('1'),
        externalTokenReward: '',
        externalTokenAddress: '',
        periodLength: 1,
        periods: 20,
      })
      .send()

    const savedProposal = await this.groupDaoProposalRepository.save({
      proposal_id: p.result.id,
      dao_id: dao.id,
      option_1: createProposal.option_1,
      option_2: createProposal.option_2,
      group_uuid: createProposal.group_uuid,
      proposal_type: createProposal.proposal_type,
    })

    const proposal = await this.getProposal(savedProposal.proposal_id)
    const announcementMessage: CreateAnnouncementPayload = {
      markdown: `**Voting on ${proposal.title} is now open**
                    To vote, click on http://${proposal.url}/${p.id}.  Voting closes at ${new Date(
        proposal.closed_at,
      ).toUTCString()}.`,
    }

    await this.createAnnouncement(access_token, announcementMessage, createProposal.group_uuid)

    return proposal
  }

  async getProposal(uuid: string): Promise<ProposalResponse> {
    const arc = this.arcInstance()
    const pr = new Proposal(uuid, arc)
    const stateObservable = pr.state()
    const dbProposal = await this.groupDaoProposalRepository.findOne({ where: { proposal_id: uuid } })

    if (dbProposal === null) {
      throw new HttpException('Proposal not found', 404)
    }

    return this.handleProposal(stateObservable, dbProposal)
  }

  async getProposals(group_uuid: string): Promise<ProposalResponse[]> {
    const dbProposals = await this.groupDaoProposalRepository.find({
      where: {
        group_uuid,
      },
    })

    const arc = this.arcInstance()
    const arrProposals: Promise<ProposalResponse>[] = dbProposals.map((dbProposal) => {
      const pr = new Proposal(dbProposal.proposal_id, arc)
      const stateObservable = pr.state()

      return this.handleProposal(stateObservable, dbProposal)
    })

    return Promise.all(arrProposals)
  }

  async handleProposal(stateObservable, dbProposal): Promise<ProposalResponse> {
    return new Promise((resolve, reject) => {
      stateObservable
        .pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          skipWhile((res) => res === null, true),
          timeout(2000),
        )
        .subscribe({
          next: (proposal: IProposalState) => {
            if (proposal === undefined || proposal == null) {
              reject(new HttpException('Something went wrong', 409))
            }
            console.log(proposal.closingAt)
            resolve({
              id: proposal.id,
              title: proposal.title,
              group_uuid: dbProposal.group_uuid,
              dao_id: proposal.dao.id,
              option_1: dbProposal.option_1,
              option_2: dbProposal.option_2,
              proposal_type: dbProposal.proposal_type,
              url: proposal.url,
              closed_at: new Date(proposal.closingAt * 1000).toUTCString(),
            })
          },
          error: () => {
            reject(new HttpException('Conflict', 409))
          },
        })
    })
  }
  arcInstance(): client.Arc {
    return new client.Arc({
      graphqlHttpProvider: 'http://localhost:8000/subgraphs/name/daostack',
      graphqlWsProvider: 'http://127.0.0.1:8001/subgraphs/name/daostack',
      web3Provider: 'http://127.0.0.1:8545',
      ipfsProvider: 'http://localhost:5001/api/v0',
    })
  }

  async createAnnouncement(
    access_token: string,
    body: CreateAnnouncementPayload,
    group_uuid: string,
  ): Promise<any> {
    return (
      await axios.request<any>({
        url: `${svcUrl}/v1/groups/${group_uuid}/announcements`,
        method: 'post',
        data: body,
        headers: {
          Authorization: access_token,
        },
      })
    ).data
  }
}
