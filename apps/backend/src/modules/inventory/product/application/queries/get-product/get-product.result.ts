import { ApiProperty } from '@nestjs/swagger';

export class GetProductResult {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly companyId: string;

  @ApiProperty()
  readonly categoryId: string;

  @ApiProperty()
  readonly brandId: string;

  @ApiProperty()
  readonly unitId: string;

  @ApiProperty()
  readonly code: string;

  @ApiProperty({
    nullable: true,
  })
  readonly sku: string | null;

  @ApiProperty({
    nullable: true,
  })
  readonly barcode: string | null;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({
    nullable: true,
  })
  readonly description: string | null;

  @ApiProperty()
  readonly purchasePrice: number;

  @ApiProperty()
  readonly cost: number;

  @ApiProperty()
  readonly salePrice: number;

  @ApiProperty()
  readonly profit: number;

  @ApiProperty()
  readonly margin: number;

  @ApiProperty({
    nullable: true,
  })
  readonly imageUrl: string | null;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(
    id: string,
    companyId: string,
    categoryId: string,
    brandId: string,
    unitId: string,
    code: string,
    sku: string | null,
    barcode: string | null,
    name: string,
    description: string | null,
    purchasePrice: number,
    cost: number,
    salePrice: number,
    profit: number,
    margin: number,
    imageUrl: string | null,
    status: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    Object.assign(this, {
      id,
      companyId,
      categoryId,
      brandId,
      unitId,
      code,
      sku,
      barcode,
      name,
      description,
      purchasePrice,
      cost,
      salePrice,
      profit,
      margin,
      imageUrl,
      status,
      createdAt,
      updatedAt,
    });
  }
}
