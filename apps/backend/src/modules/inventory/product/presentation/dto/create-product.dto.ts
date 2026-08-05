import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  IsPositive,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'cmf4r4b4m0000abc123456789',
  })
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @ApiProperty({
    example: 'cmf4r4b4m0000abc123456780',
  })
  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;

  @ApiProperty({
    example: 'cmf4r4b4m0000abc123456781',
  })
  @IsString()
  @IsNotEmpty()
  readonly brandId: string;

  @ApiProperty({
    example: 'cmf4r4b4m0000abc123456782',
  })
  @IsString()
  @IsNotEmpty()
  readonly unitId: string;

  @ApiProperty({
    example: 'COR330',
  })
  @IsString()
  @MaxLength(30)
  readonly code: string;

  @ApiPropertyOptional({
    example: 'SKU-0001',
  })
  @IsOptional()
  @IsString()
  readonly sku?: string;

  @ApiPropertyOptional({
    example: '7701234567890',
  })
  @IsOptional()
  @IsString()
  readonly barcode?: string;

  @ApiProperty({
    example: 'Corona Extra 330ml',
  })
  @IsString()
  @MaxLength(150)
  readonly name: string;

  @ApiPropertyOptional({
    example: 'Botella de vidrio',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: 3500,
  })
  @IsNumber()
  @IsPositive()
  readonly purchasePrice: number;

  @ApiProperty({
    example: 3800,
  })
  @IsNumber()
  @IsPositive()
  readonly cost: number;

  @ApiProperty({
    example: 5000,
  })
  @IsNumber()
  @IsPositive()
  readonly salePrice: number;

  @ApiPropertyOptional({
    example: 'https://cdn.beercontrol.com/products/corona.png',
  })
  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;
}
