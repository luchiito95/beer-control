import { ApiProperty } from '@nestjs/swagger';

export class CompanySummaryResult {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({
    nullable: true,
  })
  readonly legalName: string | null;

  @ApiProperty({
    nullable: true,
  })
  readonly taxId: string | null;

  @ApiProperty({
    nullable: true,
  })
  readonly email: string | null;

  @ApiProperty()
  readonly currencyCode: string;

  @ApiProperty()
  readonly timezone: string;

  @ApiProperty()
  readonly status: string;

  constructor(
    id: string,
    name: string,
    legalName: string | null,
    taxId: string | null,
    email: string | null,
    currencyCode: string,
    timezone: string,
    status: string,
  ) {
    this.id = id;
    this.name = name;
    this.legalName = legalName;
    this.taxId = taxId;
    this.email = email;
    this.currencyCode = currencyCode;
    this.timezone = timezone;
    this.status = status;
  }
}
