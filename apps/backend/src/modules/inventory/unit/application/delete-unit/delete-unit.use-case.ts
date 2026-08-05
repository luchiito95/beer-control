import { Injectable, NotFoundException } from '@nestjs/common';

import { UnitRepository } from '../../domain/repositories/unit.repository';

import { DeleteUnitCommand } from './delete-unit.command';
import { DeleteUnitResult } from './delete-unit.result';

@Injectable()
export class DeleteUnitUseCase {
  constructor(private readonly repository: UnitRepository) {}

  async execute(command: DeleteUnitCommand): Promise<DeleteUnitResult> {
    const unit = await this.repository.findById(command.id);

    if (!unit) {
      throw new NotFoundException(`Unit '${command.id}' not found.`);
    }

    await this.repository.softDelete(command.id);

    return new DeleteUnitResult('Unit deleted successfully.');
  }
}
