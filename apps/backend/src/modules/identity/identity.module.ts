import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { CompanyRepository } from './domain/repositories/company.repository';

import { PrismaCompanyRepository } from './infrastructure/persistence/repositories/prisma-company.repository';

import { CompanyController } from './presentation/controllers/company.controller';

import { CreateCompanyUseCase } from './application/create-company/create-company.use-case';
import { UpdateCompanyUseCase } from './application/update-company/update-company.use-case';
import { DeleteCompanyUseCase } from './application/delete-company/delete-company.use-case';

import { GetCompanyUseCase } from './application/queries/get-company/get-company.use-case';
import { ListCompaniesUseCase } from './application/queries/list-companies/list-companies.use-case';

const CommandHandlers = [
  CreateCompanyUseCase,
  UpdateCompanyUseCase,
  DeleteCompanyUseCase,
];

const QueryHandlers = [
  GetCompanyUseCase,
  ListCompaniesUseCase,
];

@Module({
  imports: [
    DatabaseModule,
  ],

  controllers: [
    CompanyController,
  ],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
  ],

  exports: [
    CompanyRepository,
  ],
})
export class IdentityModule {}