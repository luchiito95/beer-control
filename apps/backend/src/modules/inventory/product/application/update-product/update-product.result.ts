import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductResult {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({
    nullable: true,
  })
  readonly sku: string | null;

  @ApiProperty({
    nullable: true,
  })
  readonly barcode: string | null;

  @ApiProperty()
  readonly salePrice: number;

  @ApiProperty()
  readonly status: string;

  constructor(
    id: string,
    code: string,
    name: string,
    sku: string | null,
    barcode: string | null,
    salePrice: number,
    status: string,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.sku = sku;
    this.barcode = barcode;
    this.salePrice = salePrice;
    this.status = status;
  }
}
