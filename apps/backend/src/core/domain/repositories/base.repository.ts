import { SearchCriteria } from '../../application/search/search-criteria';
import { SearchPage } from '../../application/search/search-page';

import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<TEntity extends BaseEntity> {
  abstract create(entity: TEntity): Promise<TEntity>;

  abstract findById(id: string): Promise<TEntity | null>;

  abstract search(criteria: SearchCriteria): Promise<SearchPage<TEntity>>;

  abstract update(entity: TEntity): Promise<TEntity>;

  abstract softDelete(id: string): Promise<void>;
}
