import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Company identifier.',
    example: 'cmel3n3kb0000abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @ApiProperty({
    description: 'Unique category code within the company.',
    example: 'BEER',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly code: string;

  @ApiProperty({
    description: 'Category name.',
    example: 'Beers',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Category description.',
    example: 'Beer products available for sale.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}