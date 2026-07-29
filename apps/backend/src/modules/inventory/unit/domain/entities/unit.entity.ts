import { BaseEntity } from '../../../../../core/domain/entities/base.entity';

import { UnitStatus } from '../enums/unit-status.enum';

import { UnitProps } from './unit.props';

export class UnitEntity extends BaseEntity {
  private _companyId: string;
  private _code: string;
  private _name: string;
  private _symbol: string;
  private _description: string | null;
  private _status: UnitStatus;

  constructor(props: UnitProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._companyId = props.companyId;
    this._code = props.code;
    this._name = props.name;
    this._symbol = props.symbol;
    this._description = props.description ?? null;
    this._status = props.status;

    this.validate();
  }

  // Getters

  get companyId(): string {
    return this._companyId;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get symbol(): string {
    return this._symbol;
  }

  get description(): string | null {
    return this._description;
  }

  get status(): UnitStatus {
    return this._status;
  }

  // Domain behavior

  activate(): void {
    this._status = UnitStatus.ACTIVE;
  }

  deactivate(): void {
    this._status = UnitStatus.INACTIVE;
  }

  changeCode(code: string): void {
    if (!code.trim()) {
      throw new Error(
        'Unit code cannot be empty.',
      );
    }

    this._code = code.trim().toUpperCase();
  }

  changeName(name: string): void {
    if (!name.trim()) {
      throw new Error(
        'Unit name cannot be empty.',
      );
    }

    this._name = name.trim();
  }

  changeSymbol(symbol: string): void {
    if (!symbol.trim()) {
      throw new Error(
        'Unit symbol cannot be empty.',
      );
    }

    this._symbol = symbol.trim();
  }

  changeDescription(
    description: string | null,
  ): void {
    this._description =
      description?.trim() || null;
  }

  update(props: {
    code: string;
    name: string;
    symbol: string;
    description: string | null;
  }): void {
    this.changeCode(props.code);
    this.changeName(props.name);
    this.changeSymbol(props.symbol);
    this.changeDescription(props.description);

    this.validate();
  }

  private validate(): void {
    if (!this._companyId.trim()) {
      throw new Error(
        'Company ID is required.',
      );
    }

    if (!this._code.trim()) {
      throw new Error(
        'Unit code is required.',
      );
    }

    if (!this._name.trim()) {
      throw new Error(
        'Unit name is required.',
      );
    }

    if (!this._symbol.trim()) {
      throw new Error(
        'Unit symbol is required.',
      );
    }
  }
}