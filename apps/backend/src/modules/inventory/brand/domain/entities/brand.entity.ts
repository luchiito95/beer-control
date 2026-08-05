import { BaseEntity } from '../../../../../core/domain/entities/base.entity';

import { BrandStatus } from '../enums/brand-status.enum';

import { BrandProps } from './brand.props';

export class BrandEntity extends BaseEntity {
  private _companyId: string;
  private _code: string;
  private _name: string;
  private _description: string | null;
  private _status: BrandStatus;

  constructor(props: BrandProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._companyId = props.companyId;
    this._code = props.code;
    this._name = props.name;
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

  get description(): string | null {
    return this._description;
  }

  get status(): BrandStatus {
    return this._status;
  }

  // Domain behavior

  activate(): void {
    this._status = BrandStatus.ACTIVE;
  }

  deactivate(): void {
    this._status = BrandStatus.INACTIVE;
  }

  changeCode(code: string): void {
    this._code = code.trim().toUpperCase();
  }

  changeName(name: string): void {
    if (!name.trim()) {
      throw new Error('Brand name cannot be empty.');
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

  // Validation

  private validate(): void {
    if (!this._companyId.trim()) {
      throw new Error('Company ID is required.');
    }

    if (!this._code.trim()) {
      throw new Error('Brand code is required.');
    }

    if (!this._name.trim()) {
      throw new Error('Brand name is required.');
    }
  }
}
