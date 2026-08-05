import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { SearchQueryDto } from '../../../../../core/presentation/dto/search-query.dto';

import { CompanyStatus } from '../../domain/enums/company-status.enum';

export class SearchCompanyDto extends SearchQueryDto {
  @ApiPropertyOptional({
    description: 'Company name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Tax identifier',
  })
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiPropertyOptional({
    description: 'Company status',
    enum: CompanyStatus,
  })
  @IsOptional()
  @IsEnum(CompanyStatus)
  status?: CompanyStatus;
}
