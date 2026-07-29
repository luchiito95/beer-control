import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';
import { CategoryEntity } from '../entities/category.entity';

export abstract class CategoryRepository
  extends BaseRepository<CategoryEntity> {

  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<CategoryEntity | null>;
}