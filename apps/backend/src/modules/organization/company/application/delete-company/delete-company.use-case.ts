import { Injectable, NotFoundException } from '@nestjs/common';

import { CompanyRepository } from '../../domain/repositories/company.repository';

import { DeleteCompanyCommand } from './delete-company.command';
import { DeleteCompanyResult } from './delete-company.result';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private readonly repository: CompanyRepository) {}

  async execute(command: DeleteCompanyCommand): Promise<DeleteCompanyResult> {
    const company = await this.repository.findById(command.id);

    if (!company) {
      throw new NotFoundException(`Company '${command.id}' not found.`);
    }

    await this.repository.softDelete(command.id);

    return new DeleteCompanyResult('Company deleted successfully.');
  }
}
