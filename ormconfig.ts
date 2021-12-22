import * as dotenv from 'dotenv'

if (!(<any>module).hot) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
}

dotenv.config({
  path: `.env`,
})

Object.keys(process.env).map((envName) => {
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n')
  return process
})

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: false,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*{.ts,.js}'],
}
