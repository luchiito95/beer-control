import { BaseEntity } from '../../../../../core/domain/entities/base.entity';
import { WarehouseStatus } from '../enums/warehouse-status.enum';
import { WarehouseProps } from './warehouse.props';

export class WarehouseEntity extends BaseEntity {
  private _branchId: string;
  private _code: string;
  private _name: string;
  private _description: string | null;
  private _status: WarehouseStatus;

  constructor(props: WarehouseProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._branchId = props.branchId;
    this._code = props.code;
    this._name = props.name;
    this._description = props.description ?? null;
    this._status = props.status;

    this.validate();
  }

  // Getters

  get branchId(): string {
    return this._branchId;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | null {
    return this._description;
  }

  get status(): WarehouseStatus {
    return this._status;
  }

  // Domain behavior

  activate(): void {
    this._status = WarehouseStatus.ACTIVE;
  }

  deactivate(): void {
    this._status = WarehouseStatus.INACTIVE;
  }

  changeCode(code: string): void {
    this._code = code.trim().toUpperCase();
  }

  changeName(name: string): void {
    if (!name.trim()) {
      throw new Error('Warehouse name cannot be empty.');
    }

    this._name = name.trim();
  }

  changeDescription(description: string | null): void {
    this._description = description?.trim() || null;
  }

  update(props: {
    code: string;
    name: string;
    description: string | null;
  }): void {
    this.changeCode(props.code);
    this.changeName(props.name);
    this.changeDescription(props.description);

    this.validate();
  }

  private validate(): void {
    if (!this._branchId.trim()) {
      throw new Error('Branch ID is required.');
    }

    if (!this._code.trim()) {
      throw new Error('Warehouse code is required.');
    }

    if (!this._name.trim()) {
      throw new Error('Warehouse name is required.');
    }
  }
}
