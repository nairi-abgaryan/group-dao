'use strict'

import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @CreateDateColumn({
    type: 'time with time zone',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'time with time zone',
  })
  updatedAt: Date
}
