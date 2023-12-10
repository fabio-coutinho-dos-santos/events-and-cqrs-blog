import { DataSource } from "typeorm";
import 'dotenv/config'

export function ormconfig (): any {
  const config = {
    type: 'sqlite',
    database: process.env.NODE_ENV === 'test' ? ':memory:' : './data.sqlite',
    entities: [`${__dirname}/../**/entities/*{ts, js}`],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSource = new DataSource(ormconfig());