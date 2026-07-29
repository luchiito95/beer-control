export class CreateUnitCommand {
  constructor(
    public readonly companyId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly symbol: string,
    public readonly description: string | null,
  ) {}
}