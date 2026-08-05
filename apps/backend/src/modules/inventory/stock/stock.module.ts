import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ProductModule } from '../product/product.module';
import { WarehouseModule } from '../warehouse/warehouse.module';

import {
  CreateStockUseCase,
} from './application';

import {
  StockRepository,
} from './domain';

import {
  PrismaStockRepository,
} from './infrastructure';

import {
  StockController,
} from './presentation';

@Module({

  imports: [

    DatabaseModule,

    ProductModule,

    WarehouseModule,

  ],

  controllers: [

    StockController,

  ],

  providers: [

    CreateStockUseCase,

    {

      provide: StockRepository,

      useClass: PrismaStockRepository,

    },

  ],

  exports: [

    StockRepository,

  ],

})
export class StockModule {}