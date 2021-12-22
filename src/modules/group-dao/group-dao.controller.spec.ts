import { Test, TestingModule } from '@nestjs/testing'
import { GroupDaoController } from './group-dao.controller'
import { GroupDaoService } from './group-dao.service'

describe('AppController', () => {
  let appController: GroupDaoController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GroupDaoController],
      providers: [GroupDaoService],
    }).compile()

    appController = app.get<GroupDaoController>(GroupDaoController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      return true
    })
  })
})
