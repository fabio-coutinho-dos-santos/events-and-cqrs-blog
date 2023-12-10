import { DataSource } from "typeorm";

export function ormconfig (): any {
  const config = {
    type: 'sqlite',
    database: './data.sqlite',
    entities: [`${__dirname}/../**/entities/*{ts, js}`],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSource = new DataSource(ormconfig());