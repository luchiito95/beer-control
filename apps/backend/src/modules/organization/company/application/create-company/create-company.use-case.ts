import { ConflictException, Injectable } from '@nestjs/common';

import { Company } from '../../../company/domain/entities/company.entity';
import { CompanyStatus } from '../../../company/domain/enums/company-status.enum';
import { CompanyRepository } from '../../../company/domain/repositories/company.repository';

import { CreateCompanyCommand } from './create-company.command';
import { CreateCompanyResult } from './create-company.result';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(command: CreateCompanyCommand): Promise<CreateCompanyResult> {
    if (command.taxId) {
      const existingCompany = await this.companyRepository.findByTaxId(
        command.taxId,
      );

      if (existingCompany) {
        throw new ConflictException(
          `Company with taxId '${command.taxId}' already exists.`,
        );
      }
    }

    const company = new Company({
      id: '',
      name: command.name,
      legalName: command.legalName,
      taxId: command.taxId,
      email: command.email,
      phone: command.phone,
      currencyCode: command.currencyCode,
      timezone: command.timezone,
      status: CompanyStatus.TRIAL,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdCompany = await this.companyRepository.create(company);

    return new CreateCompanyResult(
      createdCompany.id,
      createdCompany.name,
      createdCompany.status.toString(),
    );
  }
}
