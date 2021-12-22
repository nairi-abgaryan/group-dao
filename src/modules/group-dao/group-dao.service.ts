/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import * as client from '@daostack/client'
import { CreateAnnouncementPayload } from './interfaces'
const utils = client.utils
import { default as axios } from 'axios'
import { GLOBAL_ID_BASE_URL as svcUrl } from '../../conf'
import { GroupDaoRepository } from './group-dao.repository'
import { GroupDaoEntity } from './entities/group-dao.entity'
import { CreateProposal } from './dto/create-group-dao.dto'

@Injectable()
export class GroupDaoService {
  constructor(private groupDaoRepository: GroupDaoRepository) {}
  
  async createGroupDao(group_uuid: string, access_token): Promise<void>
  {
    const arc: client.Arc = this.arcInstance()
    await arc.fetchContractInfos()
  
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const daos = await arc.daos().first()
    const groupDao = new GroupDaoEntity()
    groupDao.group_uuid = group_uuid
    groupDao.dao_uuid = daos[0].id
  
    await this.groupDaoRepository.create(groupDao)
    
    const announcementMessage: CreateAnnouncementPayload = {
      markdown: `**This group has been converted to a DAO**
      *To see the DAO on Ethereum, click on this link https://ethplorer.io/tx/0x123456%20Ethplorer*\n`
    }
    
    await this.createAnnouncement(access_token, announcementMessage, group_uuid)
  }
  
  async createProposal(proposal: CreateProposal, access_token): Promise<void> {
    const arc: client.Arc = this.arcInstance()
    await arc.fetchContractInfos()
    
    try {
      // we get the first returned item from the obervable that returns a list of DAOs
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const daos = await arc.daos().first()
  
      const dao = daos[0]
      const schemes = await dao.schemes({ where: { name: 'ContributionReward'}}).first()
  
      if (schemes.length === 0) {
        throw Error('Something went wrong - no ContributionReward scheme was registered with this DAO')
      }
      
      const schemeState = await schemes[0].state().first()
  
      // Send Transaction to create new proposal
      const minedTx = await dao.createProposal({
        description: "Change group visibility",
        title: "Change group visibility",
        url: "http://localhost:3000",
        scheme: schemeState.address,
        beneficiary: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
        nativeTokenReward: "",
        reputationReward: utils.toWei('100'),
        ethReward: utils.toWei('1'),
        externalTokenReward: "",
        externalTokenAddress: "",
        periodLength: "",
        periods: ""
      }).send()
  
      console.log(`Tx Hash: ${minedTx.receipt.transactionHash}`)
      const proposal = await dao.proposals({where: {id: '0x0cac41c6f384e0c6e5c551d64a779b84f27d51d9bd6c1a8bf9d38c8610138157'}}).first()
      console.log(proposal)
      dao.proposals().subscribe(
        async (proposals) => {
          for (const proposal of proposals) {
            proposal.state().subscribe(
              (p) => console.log(p)
            )
          }
        })
    } catch (e) {
      console.log('err', e)
    }
  }
  
  arcInstance(): client.Arc {
    return new client.Arc({
      graphqlHttpProvider: 'http://localhost:8000/subgraphs/name/daostack',
      graphqlWsProvider: 'http://127.0.0.1:8001/subgraphs/name/daostack',
      web3Provider: 'http://127.0.0.1:8545',
      ipfsProvider: "http://localhost:5001/api/v0",
    })
  }

  async createAnnouncement(
    access_token: string,
    body: CreateAnnouncementPayload,
    group_uuid: string,
  ): Promise<any> {
      return (await axios.request<any>({
        url: `${svcUrl}/v1/groups/${group_uuid}/announcements`,
        method: 'post',
        data: body,
        headers: {
          Authorization: access_token,
        },
      })).data
  }
}
