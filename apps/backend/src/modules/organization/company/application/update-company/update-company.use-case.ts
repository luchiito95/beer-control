import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CompanyRepository } from '../../domain/repositories/company.repository';

import { UpdateCompanyCommand } from './update-company.command';
import { UpdateCompanyResult } from './update-company.result';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    private readonly repository: CompanyRepository,
  ) {}

  async execute(
    command: UpdateCompanyCommand,
  ): Promise<UpdateCompanyResult> {

    const company = await this.repository.findById(command.id);

    if (!company) {
      throw new NotFoundException(
        `Company '${command.id}' not found.`,
      );
    }

    if (
      command.taxId &&
      command.taxId !== company.taxId
    ) {
      const existing =
        await this.repository.findByTaxId(command.taxId);

      if (
        existing &&
        existing.id !== company.id
      ) {
        throw new ConflictException(
          `Company with taxId '${command.taxId}' already exists.`,
        );
      }
    }

    company.update({
      name: command.name,
      legalName: command.legalName,
      taxId: command.taxId,
      email: command.email,
      phone: command.phone,
      currencyCode: command.currencyCode,
      timezone: command.timezone,
    });

    const updated =
      await this.repository.update(company);

    return new UpdateCompanyResult(
      updated.id,
      updated.name,
      updated.status,
    );
  }
}