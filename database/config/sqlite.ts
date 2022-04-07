import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [
    path.resolve(
      __dirname,
      '..',
      '..',
      'src',
      '**',
      'entities',
      '*.entity{.ts,.js}',
    ),
  ],
  synchronize: true,
  dropSchema: true,
  keepConnectionAlive: true,
};

module.exports = options;
