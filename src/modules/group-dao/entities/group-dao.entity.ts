import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AbstractEntity } from '../../../models/abstract.entity'

@Entity({ name: 'group-dao' })
export class GroupDaoEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column()
  dao_uuid: number

  @Column()
  group_uuid: string
}
