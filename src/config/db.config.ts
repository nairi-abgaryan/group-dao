import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export function getDbConfig(): TypeOrmModuleOptions {
  console.log(__dirname)
  const entities = [`${__dirname}/../modules/**/*.entity{.ts,.js}`]
  const migrations = [`${__dirname}/../../migrations/*{.ts,.js}`]

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    autoLoadEntities: false,
    migrations,
    entities,
    migrationsRun: true,
    cli: {
      migrationsDir: 'migration',
    },
  }
}
