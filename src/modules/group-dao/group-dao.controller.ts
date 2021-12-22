import { Body, Controller, Headers, Post } from '@nestjs/common'
import { GroupDaoService } from './group-dao.service'
import { CreateGroupDaoDto, CreateProposal } from './dto/create-group-dao.dto'

@Controller()
export class GroupDaoController {
  constructor(private readonly appService: GroupDaoService) {}

  @Post('/group-daos')
  async createGroupDao(@Headers() headers: any, @Body() groupDaoRequest: CreateGroupDaoDto): Promise<void> {
    return this.appService.createGroupDao(groupDaoRequest.group_uuid, headers.authorization)
  }

  @Post('group-dao/proposals')
  async createProposal(@Headers() headers: any, @Body() groupDaoRequest: CreateProposal): Promise<void> {
    return this.appService.createProposal(groupDaoRequest, headers.authorization)
  }
}
