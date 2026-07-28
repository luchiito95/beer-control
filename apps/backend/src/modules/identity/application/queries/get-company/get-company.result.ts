export class GetCompanyResult {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly legalName: string | null,
    public readonly taxId: string | null,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly currencyCode: string,
    public readonly timezone: string,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}