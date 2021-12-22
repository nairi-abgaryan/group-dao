import { Module } from '@nestjs/common'
import { GroupDaoController } from './group-dao.controller'
import { GroupDaoService } from './group-dao.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupDaoRepository } from './group-dao.repository'
import { GroupDaoProposalRepository } from './group-dao-proposal.repository'

@Module({
  imports: [TypeOrmModule.forFeature([GroupDaoRepository, GroupDaoProposalRepository])],
  controllers: [GroupDaoController],
  providers: [GroupDaoService],
})
export class GroupDaoModule {}
