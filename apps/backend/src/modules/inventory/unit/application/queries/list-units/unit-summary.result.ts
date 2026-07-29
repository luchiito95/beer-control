export class UnitSummaryResult {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly symbol: string,
    public readonly status: string,
  ) {}
}