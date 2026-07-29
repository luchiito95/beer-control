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

export class CreateUnitDto {
  @ApiProperty({
    description: 'Company identifier.',
    example: 'cmel3n3kb0000abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @ApiProperty({
    description: 'Unique unit code within the company.',
    example: 'L',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly code: string;

  @ApiProperty({
    description: 'Unit name.',
    example: 'Liter',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  readonly name: string;

  @ApiProperty({
    description: 'Unit symbol.',
    example: 'L',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly symbol: string;

  @ApiPropertyOptional({
    description: 'Unit description.',
    example: 'Volume measurement unit.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}