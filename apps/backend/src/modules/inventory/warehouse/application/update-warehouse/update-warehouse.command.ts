export class UpdateWarehouseCommand {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
  ) {}
}
