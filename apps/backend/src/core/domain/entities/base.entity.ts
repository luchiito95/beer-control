import { BaseEntityProps } from './base-entity.props';

export abstract class BaseEntity {

  public readonly id: string;

  public readonly createdAt: Date;

  private _updatedAt: Date;

  private _deletedAt: Date | null;

  protected constructor(
    props: BaseEntityProps,
  ) {

    this.id = props.id;

    this.createdAt = props.createdAt;

    this._updatedAt = props.updatedAt;

    this._deletedAt = props.deletedAt;

  }

  get updatedAt(): Date {

    return this._updatedAt;

  }

  get deletedAt(): Date | null {

    return this._deletedAt;

  }

  protected touch(): void {

    this._updatedAt = new Date();

  }

  protected markAsDeleted(): void {

    this._deletedAt = new Date();

  }

}