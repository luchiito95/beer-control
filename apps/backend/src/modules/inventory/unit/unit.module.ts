import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { CompanyModule } from '../../organization/company/company.module';

import { UnitRepository } from './domain/repositories/unit.repository';

import { PrismaUnitRepository } from './infrastructure/persistence/repositories/prisma-unit.repository';

import { UnitController } from './presentation/controllers/unit.controller';

import { CreateUnitUseCase } from './application/create-unit/create-unit.use-case';
import { UpdateUnitUseCase } from './application/update-unit/update-unit.use-case';
import { DeleteUnitUseCase } from './application/delete-unit/delete-unit.use-case';

import { GetUnitUseCase } from './application/queries/get-unit/get-unit.use-case';
import { ListUnitsUseCase } from './application/queries/list-units/list-units.use-case';

const CommandHandlers = [
  CreateUnitUseCase,
  UpdateUnitUseCase,
  DeleteUnitUseCase,
];

const QueryHandlers = [
  GetUnitUseCase,
  ListUnitsUseCase,
];

@Module({
  imports: [
    DatabaseModule,
    CompanyModule,
  ],

  controllers: [
    UnitController,
  ],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: UnitRepository,
      useClass: PrismaUnitRepository,
    },
  ],

  exports: [
    UnitRepository,
  ],
})
export class UnitModule {}