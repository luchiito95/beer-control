import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UnitRepository } from '../../domain/repositories/unit.repository';

import { UpdateUnitCommand } from './update-unit.command';
import { UpdateUnitResult } from './update-unit.result';

@Injectable()
export class UpdateUnitUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(command: UpdateUnitCommand): Promise<UpdateUnitResult> {
    const unit = await this.unitRepository.findById(command.id);

    if (!unit) {
      throw new NotFoundException(`Unit '${command.id}' not found.`);
    }

    if (unit.code !== command.code) {
      const existingUnit = await this.unitRepository.findByCompanyAndCode(
        unit.companyId,
        command.code,
      );

      if (existingUnit && existingUnit.id !== unit.id) {
        throw new ConflictException(
          `Unit with code '${command.code}' already exists for this company.`,
        );
      }
    }

    unit.update({
      code: command.code,
      name: command.name,
      symbol: command.symbol,
      description: command.description,
    });

    const updated = await this.unitRepository.update(unit);

    return new UpdateUnitResult(
      updated.id,
      updated.name,
      updated.symbol,
      updated.status.toString(),
    );
  }
}
