import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AbstractEntity } from '../../../models/abstract.entity'

@Entity({ name: 'group-dao-proposal' })
export class GroupDaoProposalEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column()
  proposal_id: string

  @Column()
  dao_id: string

  @Column()
  proposal_type: string

  @Column()
  option_1: string

  @Column()
  option_2: string

  @Column()
  group_uuid: string
}
