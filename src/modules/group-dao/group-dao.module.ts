import { Module } from '@nestjs/common'
import { GroupDaoController } from './group-dao.controller'
import { GroupDaoService } from './group-dao.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupDaoRepository } from './group-dao.repository'

@Module({
  imports: [TypeOrmModule.forFeature([GroupDaoRepository])],
  controllers: [GroupDaoController],
  providers: [GroupDaoService],
})
export class GroupDaoModule {}
