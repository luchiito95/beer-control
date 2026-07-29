import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { BranchModule } from '../../organization/branch/branch.module';

import { WarehouseRepository } from './domain/repositories/warehouse.repository';

import { PrismaWarehouseRepository } from './infrastructure/repositories/prisma-warehouse.repository';

import { WarehouseController } from './presentation/controllers/warehouse.controller';

import { CreateWarehouseUseCase } from './application/create-branch/create-warehouse.use-case';
import { UpdateWarehouseUseCase } from './application/update-branch/update-warehouse.use-case';
import { DeleteWarehouseUseCase } from './application/delete-branch/delete-warehouse.use-case';

import { GetWarehouseUseCase } from './application/queries/get-branch/get-warehouse.use-case';
import { ListWarehousesUseCase } from './application/queries/list-branches/list-warehouses.use-case';


const CommandHandlers = [
  CreateWarehouseUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase,
];

const QueryHandlers = [
  GetWarehouseUseCase,
  ListWarehousesUseCase,
];

@Module({
  imports: [
    DatabaseModule,
    BranchModule,
  ],

  controllers: [
    WarehouseController,
  ],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: WarehouseRepository,
      useClass: PrismaWarehouseRepository,
    },
  ],

  exports: [
    WarehouseRepository,
  ],
})
export class WarehouseModule {}