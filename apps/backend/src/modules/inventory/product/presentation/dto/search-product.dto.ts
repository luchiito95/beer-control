import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { SearchQueryDto } from '../../../../../core/presentation/dto/search-query.dto';

export class SearchProductDto extends SearchQueryDto {
  @ApiPropertyOptional({
    description: 'Company identifier',
    example: 'cmp_123456',
  })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({
    description: 'Category identifier',
    example: 'cat_123456',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Brand identifier',
    example: 'brd_123456',
  })
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiPropertyOptional({
    description: 'Unit identifier',
    example: 'unt_123456',
  })
  @IsOptional()
  @IsString()
  unitId?: string;

  @ApiPropertyOptional({
    description: 'Product status',
    example: 'ACTIVE',
  })
  @IsOptional()
  @IsString()
  status?: string;
}
