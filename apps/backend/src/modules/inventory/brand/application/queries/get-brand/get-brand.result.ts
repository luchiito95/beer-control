export class GetBrandResult {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
