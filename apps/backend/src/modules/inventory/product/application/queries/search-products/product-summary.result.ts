import { ApiProperty } from '@nestjs/swagger';

export class ProductSummaryResult {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly salePrice: number;

  @ApiProperty()
  readonly status: string;

  constructor(
    id: string,
    code: string,
    name: string,
    salePrice: number,
    status: string,
  ) {
    Object.assign(this, {
      id,
      code,
      name,
      salePrice,
      status,
    });
  }
}
