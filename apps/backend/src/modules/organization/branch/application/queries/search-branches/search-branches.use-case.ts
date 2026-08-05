import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { BranchRepository } from '../../../domain/repositories/branch.repository';

import { BranchResponseMapper } from '../../../presentation/mappers/branch-response.mapper';

import { BranchSummaryResult } from './branch-summary.result';
import { SearchBranchesQuery } from './search-branches.query';

@Injectable()
export class SearchBranchesUseCase {
  constructor(private readonly repository: BranchRepository) {}

  async execute(
    query: SearchBranchesQuery,
  ): Promise<SearchPage<BranchSummaryResult>> {
    const branches = await this.repository.search(query.criteria);

    return BranchResponseMapper.toSummarySearch(branches);
  }
}
