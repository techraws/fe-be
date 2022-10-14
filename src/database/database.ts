import "reflect-metadata";
import { ConnectionOptions } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
const dbConnection: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [ env === 'production' ? 'build/entity/*{.ts,.js}' : 'src/entity/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity'
  },
};
export  default dbConnection 

