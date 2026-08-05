import { SearchPage } from '../../../../../core/application/search/search-page';

import { BranchEntity } from '../../domain/entities/branch.entity';

import { GetBranchResult } from '../../application/queries/get-branch/get-branch.result';
import { BranchSummaryResult } from '../../application/queries/search-branches/branch-summary.result';

export class BranchResponseMapper {
  static toGetResult(branch: BranchEntity): GetBranchResult {
    return new GetBranchResult(
      branch.id,

      branch.companyId,

      branch.code,

      branch.name,

      branch.email,

      branch.phone,

      branch.address,

      branch.city,

      branch.state,

      branch.country,

      branch.postalCode,

      branch.timezone,

      branch.status,

      branch.createdAt,

      branch.updatedAt,
    );
  }

  static toSummary(branch: BranchEntity): BranchSummaryResult {
    return new BranchSummaryResult(
      branch.id,

      branch.companyId,

      branch.code,

      branch.name,

      branch.status,
    );
  }

  static toSummarySearch(
    page: SearchPage<BranchEntity>,
  ): SearchPage<BranchSummaryResult> {
    return new SearchPage({
      items: page.items.map((branch) => BranchResponseMapper.toSummary(branch)),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}
