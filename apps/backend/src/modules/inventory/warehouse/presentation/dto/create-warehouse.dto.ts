import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({
    description: 'Branch identifier.',
    example: 'cmel3n3kb0000abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  readonly branchId: string;

  @ApiProperty({
    description: 'Unique warehouse code within the branch.',
    example: 'MAIN',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly code: string;

  @ApiProperty({
    description: 'Warehouse name.',
    example: 'Main Warehouse',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Warehouse description.',
    example: 'Main storage warehouse.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}
