import { PageResult } from '../../application/pagination/page-result';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<TEntity extends BaseEntity> {
  abstract create(entity: TEntity): Promise<TEntity>;

  abstract findById(id: string): Promise<TEntity | null>;

  abstract findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<TEntity>>;

  abstract update(entity: TEntity): Promise<TEntity>;

  abstract softDelete(id: string): Promise<void>;
}