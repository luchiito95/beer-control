import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BranchRepository } from '../../../domain/repositories/branch.repository';

import { GetBranchQuery } from './get-branch.query';
import { GetBranchResult } from './get-branch.result';

@Injectable()
export class GetBranchUseCase {
  constructor(
    private readonly repository: BranchRepository,
  ) {}

  async execute(
    query: GetBranchQuery,
  ): Promise<GetBranchResult> {

    const branch = await this.repository.findById(query.id);

    if (!branch) {
      throw new NotFoundException(
        `Branch '${query.id}' not found.`,
      );
    }

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
}