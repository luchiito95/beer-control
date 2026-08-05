import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import { SearchQueryDto } from '../../../../../core/presentation/dto/search-query.dto';

export class SearchCategoryDto extends SearchQueryDto {
  @ApiPropertyOptional({
    description: 'Company identifier',
  })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({
    description: 'Category status',
    example: 'ACTIVE',
  })
  @IsOptional()
  @IsString()
  status?: string;
}
