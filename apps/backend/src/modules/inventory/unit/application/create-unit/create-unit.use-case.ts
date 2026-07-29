import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CompanyRepository } from '../../../../organization/company/domain/repositories/company.repository';

import { UnitEntity } from '../../domain/entities/unit.entity';
import { UnitStatus } from '../../domain/enums/unit-status.enum';
import { UnitRepository } from '../../domain/repositories/unit.repository';

import { CreateUnitCommand } from './create-unit.command';
import { CreateUnitResult } from './create-unit.result';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    command: CreateUnitCommand,
  ): Promise<CreateUnitResult> {

    const company =
      await this.companyRepository.findById(
        command.companyId,
      );

    if (!company) {
      throw new NotFoundException(
        `Company '${command.companyId}' not found.`,
      );
    }

    const existingUnit =
      await this.unitRepository.findByCompanyAndCode(
        command.companyId,
        command.code,
      );

    if (existingUnit) {
      throw new ConflictException(
        `Unit with code '${command.code}' already exists for this company.`,
      );
    }

    const unit = new UnitEntity({
      id: '',
      companyId: command.companyId,
      code: command.code,
      name: command.name,
      symbol: command.symbol,
      description: command.description,
      status: UnitStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdUnit =
      await this.unitRepository.create(unit);

    return new CreateUnitResult(
      createdUnit.id,
      createdUnit.name,
      createdUnit.symbol,
      createdUnit.status.toString(),
    );
  }
}