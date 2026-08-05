import { Injectable, NotFoundException } from '@nestjs/common';

import { UnitRepository } from '../../../domain/repositories/unit.repository';

import { GetUnitQuery } from './get-unit.query';
import { GetUnitResult } from './get-unit.result';

@Injectable()
export class GetUnitUseCase {
  constructor(private readonly repository: UnitRepository) {}

  async execute(query: GetUnitQuery): Promise<GetUnitResult> {
    const unit = await this.repository.findById(query.id);

    if (!unit) {
      throw new NotFoundException(`Unit '${query.id}' not found.`);
    }

    return new GetUnitResult(
      unit.id,
      unit.companyId,
      unit.code,
      unit.name,
      unit.symbol,
      unit.description,
      unit.status,
      unit.createdAt,
      unit.updatedAt,
    );
  }
}
