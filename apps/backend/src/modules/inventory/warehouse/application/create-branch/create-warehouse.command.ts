export class CreateWarehouseCommand {
  constructor(
    public readonly branchId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
  ) {}
}