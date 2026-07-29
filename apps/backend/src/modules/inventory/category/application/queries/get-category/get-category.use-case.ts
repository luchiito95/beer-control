import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryRepository } from '../../../domain/repositories/category.repository';

import { GetCategoryQuery } from './get-category.query';
import { GetCategoryResult } from './get-category.result';

@Injectable()
export class GetCategoryUseCase {
  constructor(
    private readonly repository: CategoryRepository,
  ) {}

  async execute(
    query: GetCategoryQuery,
  ): Promise<GetCategoryResult> {

    const category =
      await this.repository.findById(query.id);

    if (!category) {
      throw new NotFoundException(
        `Category '${query.id}' not found.`,
      );
    }

    return new GetCategoryResult(
      category.id,
      category.companyId,
      category.code,
      category.name,
      category.description,
      category.status,
      category.createdAt,
      category.updatedAt,
    );
  }
}