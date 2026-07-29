import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';

import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { CompanyModule } from './modules/organization/company/company.module';
import { BranchModule } from './modules/organization/branch/branch.module';

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
  ],
})
export class AppModule {}