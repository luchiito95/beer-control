import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/';

import { CompanyModule } from '../../organization/company/company.module';

import { BrandRepository } from './domain/repositories/brand.repository';

import { PrismaBrandRepository } from './infrastructure/persistence/repositories/prisma-brand.repository';

import { BrandController } from './presentation/controllers/brand.controller';

import { CreateBrandUseCase } from './application/create-brand/create-brand.use-case';
import { UpdateBrandUseCase } from './application/update-brand/update-brand.use-case';
import { DeleteBrandUseCase } from './application/delete-brand/delete-brand.use-case';

import { GetBrandUseCase } from './application/queries/get-brand/get-brand.use-case';
import { SearchBrandsUseCase } from './application/queries/search-brands/search-brands.use-case';

const CommandHandlers = [
  CreateBrandUseCase,
  UpdateBrandUseCase,
  DeleteBrandUseCase,
];

const QueryHandlers = [GetBrandUseCase, SearchBrandsUseCase];

@Module({
  imports: [DatabaseModule, CompanyModule],

  controllers: [BrandController],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: BrandRepository,
      useClass: PrismaBrandRepository,
    },
  ],

  exports: [BrandRepository],
})
export class BrandModule {}
