export class WarehouseSummaryResult {
  constructor(
    public readonly id: string,
    public readonly branchId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly status: string,
  ) {}
}