import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { CompanyModule } from '../company/company.module';

import { BranchRepository } from './domain/repositories/branch.repository';

import { PrismaBranchRepository } from './infrastructure/persistence/repositories/prisma-branch.repository';

import { BranchController } from './presentation/controllers/branch.controller';

import { CreateBranchUseCase } from './application/create-branch/create-branch.use-case';
import { UpdateBranchUseCase } from './application/update-branch/update-branch.use-case';
import { DeleteBranchUseCase } from './application/delete-branch/delete-branch.use-case';

import { GetBranchUseCase } from './application/queries/get-branch/get-branch.use-case';
import { SearchBranchesUseCase } from './application/queries/search-branches/search-branches.use-case';

const CommandHandlers = [
  CreateBranchUseCase,
  UpdateBranchUseCase,
  DeleteBranchUseCase,
];

const QueryHandlers = [GetBranchUseCase, SearchBranchesUseCase];

@Module({
  imports: [DatabaseModule, CompanyModule],

  controllers: [BranchController],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: BranchRepository,
      useClass: PrismaBranchRepository,
    },
  ],

  exports: [BranchRepository],
})
export class BranchModule {}
