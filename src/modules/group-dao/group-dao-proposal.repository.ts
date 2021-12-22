import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { GroupDaoProposalEntity } from './entities/group-dao.proposal.entity'

@EntityRepository(GroupDaoProposalEntity)
export class GroupDaoProposalRepository extends Repository<GroupDaoProposalEntity> {}
