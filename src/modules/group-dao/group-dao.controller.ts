import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common'
import { GroupDaoService } from './group-dao.service'
import { CreateGroupDaoDto, CreateProposal } from './dto/create-group-dao.dto'
import { ProposalResponse } from './interfaces'

@Controller()
export class GroupDaoController {
  constructor(private readonly appService: GroupDaoService) {}

  @Post('/group-daos')
  async createGroupDao(@Headers() headers: any, @Body() groupDaoRequest: CreateGroupDaoDto): Promise<void> {
    return this.appService.createGroupDao(groupDaoRequest.group_uuid, headers.authorization)
  }

  @Post('group-dao/proposals')
  async createProposal(
    @Headers() headers: any,
    @Body() groupDaoRequest: CreateProposal,
  ): Promise<ProposalResponse> {
    return this.appService.createProposal(groupDaoRequest, headers.authorization)
  }

  @Get('group-dao/proposals/:uuid')
  async getProposal(@Param('uuid') uuid: string): Promise<ProposalResponse> {
    return this.appService.getProposal(uuid)
  }

  @Get('group-dao/:group_uuid/proposals')
  async getProposals(@Param('group_uuid') group_uuid): Promise<ProposalResponse[]> {
    return this.appService.getProposals(group_uuid)
  }
}
