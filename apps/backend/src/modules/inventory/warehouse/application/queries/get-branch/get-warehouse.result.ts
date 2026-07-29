export class GetWarehouseResult {
  constructor(
    public readonly id: string,
    public readonly branchId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}