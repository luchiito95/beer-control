import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';
import { BranchEntity } from '../entities/branch.entity';

export abstract class BranchRepository extends BaseRepository<BranchEntity> {
  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<BranchEntity | null>;
}
