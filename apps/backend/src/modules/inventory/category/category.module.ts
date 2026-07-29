import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { CompanyModule } from '../../organization/company/company.module';

import { CategoryRepository } from './domain/repositories/category.repository';

import { PrismaCategoryRepository } from './infrastructure/persistence/repositories/prisma-category.repository';

import { CategoryController } from './presentation/controllers/category.controller';

import { CreateCategoryUseCase } from './application/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from './application/update-category/update-category.use-case';
import { DeleteCategoryUseCase } from './application/delete-category/delete-category.use-case';

import { GetCategoryUseCase } from './application/queries/get-category/get-category.use-case';
import { ListCategoriesUseCase } from './application/queries/list-categories/list-categories.use-case';

const CommandHandlers = [
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
];

const QueryHandlers = [
  GetCategoryUseCase,
  ListCategoriesUseCase,
];

@Module({
  imports: [
    DatabaseModule,
    CompanyModule,
  ],

  controllers: [
    CategoryController,
  ],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],

  exports: [
    CategoryRepository,
  ],
})
export class CategoryModule {}