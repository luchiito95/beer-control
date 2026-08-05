import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { CompanyModule } from '../../organization/company/company.module';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { UnitModule } from '../unit/unit.module';

import { ProductRepository } from './domain/repositories/product.repository';

import { PrismaProductRepository } from './infrastructure/persistence/repositories/prisma-product.repository';

import { ProductController } from './presentation/controllers/product.controller';

import { CreateProductUseCase } from './application/create-product/create-product.use-case';
import { UpdateProductUseCase } from './application/update-product/update-product.use-case';
import { DeleteProductUseCase } from './application/delete-product/delete-product.use-case';

import { GetProductUseCase } from './application/queries/get-product/get-product.use-case';
import { SearchProductsUseCase } from './application/queries/search-products/search-products.use-case';

const CommandHandlers = [
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
];

const QueryHandlers = [GetProductUseCase, SearchProductsUseCase];

@Module({
  imports: [
    DatabaseModule,
    CompanyModule,
    CategoryModule,
    BrandModule,
    UnitModule,
  ],

  controllers: [ProductController],

  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],

  exports: [ProductRepository],
})
export class ProductModule {}
