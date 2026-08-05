export class UpdateUnitCommand {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly symbol: string,
    public readonly description: string | null,
  ) {}
}
