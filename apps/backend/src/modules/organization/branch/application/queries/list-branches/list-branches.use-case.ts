import { Injectable } from '@nestjs/common';

import { PageResult } from '../../../../../../core/application/pagination/page-result';

import { BranchRepository } from '../../../domain/repositories/branch.repository';

import { BranchResponseMapper } from '../../../presentation/mappers/branch-response.mapper';

import { BranchSummaryResult } from './branch-summary.result';
import { ListBranchesQuery } from './list-branches.query';

@Injectable()
export class ListBranchesUseCase {
  constructor(
    private readonly repository: BranchRepository,
  ) {}

  async execute(
    query: ListBranchesQuery,
  ): Promise<PageResult<BranchSummaryResult>> {

    const branches = await this.repository.findAll(
      query.page,
      query.pageSize,
    );

    return BranchResponseMapper.toSummaryPage(branches);
  }
}