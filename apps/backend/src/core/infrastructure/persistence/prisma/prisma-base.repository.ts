import { SearchCriteria } from '@core/application/search/search-criteria';
import { SearchPage } from '@core/application/search/search-page';

import { BaseEntity } from '@core/domain/entities';
import { BaseRepository } from '@core/domain/repositories/base.repository';

export abstract class PrismaBaseRepository<
  TEntity extends BaseEntity,
> implements BaseRepository<TEntity> {

  abstract create(
    entity: TEntity,
  ): Promise<TEntity>;

  abstract findById(
    id: string,
  ): Promise<TEntity | null>;

  abstract search(
    criteria: SearchCriteria,
  ): Promise<SearchPage<TEntity>>;

  abstract update(
    entity: TEntity,
  ): Promise<TEntity>;

  abstract softDelete(
    id: string,
  ): Promise<void>;

}