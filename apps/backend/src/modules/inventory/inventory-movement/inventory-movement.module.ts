import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import {
  PrismaInventoryMovementRepository,
} from './infrastructure';

import {
  InventoryMovementRepository,
} from './domain';

import {

  GetInventoryMovementUseCase,

  SearchInventoryMovementsUseCase,

  KardexUseCase,

} from './application';

import {
  InventoryMovementController,
} from './presentation';

@Module({

  imports: [

    DatabaseModule,

  ],

  controllers: [

    InventoryMovementController,

  ],

  providers: [

    GetInventoryMovementUseCase,

    SearchInventoryMovementsUseCase,

    KardexUseCase,

    {

      provide: InventoryMovementRepository,

      useClass:
        PrismaInventoryMovementRepository,

    },

  ],

  exports: [

    InventoryMovementRepository,

  ],

})
export class InventoryMovementModule {}