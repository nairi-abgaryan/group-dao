import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { GroupDaoEntity } from './entities/group-dao.entity'

@EntityRepository(GroupDaoEntity)
export class GroupDaoRepository extends Repository<GroupDaoEntity> {}
