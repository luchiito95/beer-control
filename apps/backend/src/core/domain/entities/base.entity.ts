export interface BaseEntityProps {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}

export abstract class BaseEntity {
  public readonly id: string;

  public readonly createdAt: Date;

  public updatedAt: Date;

  public deletedAt: Date | null;

  protected constructor(props: BaseEntityProps) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}