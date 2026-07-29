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

export class CreateBrandDto {
  @ApiProperty({
    description: 'Company identifier.',
    example: 'cmel3n3kb0000abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @ApiProperty({
    description: 'Unique brand code within the company.',
    example: 'BBC',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly code: string;

  @ApiProperty({
    description: 'Brand name.',
    example: 'Bogotá Beer Company',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Brand description.',
    example: 'Craft beer brand.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}