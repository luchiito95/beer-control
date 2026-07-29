import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BrandRepository } from '../../../domain/repositories/brand.repository';

import { GetBrandQuery } from './get-brand.query';
import { GetBrandResult } from './get-brand.result';

@Injectable()
export class GetBrandUseCase {
  constructor(
    private readonly repository: BrandRepository,
  ) {}

  async execute(
    query: GetBrandQuery,
  ): Promise<GetBrandResult> {

    const brand =
      await this.repository.findById(query.id);

    if (!brand) {
      throw new NotFoundException(
        `Brand '${query.id}' not found.`,
      );
    }

    return new GetBrandResult(
      brand.id,
      brand.companyId,
      brand.code,
      brand.name,
      brand.description,
      brand.status,
      brand.createdAt,
      brand.updatedAt,
    );
  }
}