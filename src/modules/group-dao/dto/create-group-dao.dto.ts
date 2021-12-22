import { ApiProperty } from '@nestjs/swagger'

export enum ProposalType {
  display_name = 'display_name',
  visibility = 'visibility',
}

export class CreateGroupDaoDto {
  @ApiProperty()
  group_uuid: string
}

export class CreateProposal {
  @ApiProperty()
  group_uuid: string

  @ApiProperty()
  proposal_type: ProposalType

  @ApiProperty()
  option_1: string

  @ApiProperty()
  option_2: string

  @ApiProperty()
  base_url: string

  @ApiProperty()
  period: number
}
