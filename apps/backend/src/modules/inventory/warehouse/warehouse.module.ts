import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database';

import { BranchModule } from '../../organization/branch/branch.module';

import { WarehouseRepository } from './domain/repositories/warehouse.repository';

import { PrismaWarehouseRepository } from './infrastructure/persistence/repositories/prisma-warehouse.repository';

import { WarehouseController } from './presentation/controllers/warehouse.controller';

import { CreateWarehouseUseCase } from './application/create-warehouse/create-warehouse.use-case';
import { UpdateWarehouseUseCase } from './application/update-warehouse/update-warehouse.use-case';
import { DeleteWarehouseUseCase } from './application/delete-warehouse/delete-warehouse.use-case';

import { GetWarehouseUseCase } from './application/queries/get-warehouse/get-warehouse.use-case';
import { SearchWarehousesUseCase } from './application/queries/search-warehouses/search-warehouses.use-case';

const CommandHandlers = [
  CreateWarehouseUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase,
];

const QueryHandlers = [GetWarehouseUseCase, SearchWarehousesUseCase];

@Module({
  imports: [DatabaseModule, BranchModule],

  controllers: [WarehouseController],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: WarehouseRepository,
      useClass: PrismaWarehouseRepository,
    },
  ],

  exports: [WarehouseRepository],
})
export class WarehouseModule {}
