import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './core/config/configuration';

import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { CompanyModule } from './modules/organization/company/company.module';
import { BranchModule } from './modules/organization/branch/branch.module';
import { WarehouseModule } from './modules/inventory/warehouse/warehouse.module';
import { CategoryModule } from './modules/inventory/category/category.module';
import { BrandModule } from './modules/inventory/brand/brand.module';
import { UnitModule } from './modules/inventory/unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    DatabaseModule,
    HealthModule,
    CompanyModule,
    BranchModule,
    WarehouseModule,
    CategoryModule,
    BrandModule,
    UnitModule,
  ],
})
export class AppModule {}