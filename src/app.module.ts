import { Module } from '@nestjs/common'
import { getDbConfig } from './config/db.config'
import * as dotenv from 'dotenv'
import { GroupDaoModule } from './modules/group-dao/group-dao.module'
import { TypeOrmModule } from '@nestjs/typeorm'
dotenv.config()

@Module({
  imports: [TypeOrmModule.forRoot(getDbConfig()), GroupDaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
