import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CompanyRepository } from '../../../../company/domain/repositories/company.repository';

import { GetCompanyQuery } from './get-company.query';
import { GetCompanyResult } from './get-company.result';

@Injectable()
export class GetCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    query: GetCompanyQuery,
  ): Promise<GetCompanyResult> {

    const company =
      await this.companyRepository.findById(query.id);

    if (!company) {
      throw new NotFoundException(
        `Company '${query.id}' not found.`,
      );
    }

    return new GetCompanyResult(
      company.id,
      company.name,
      company.legalName,
      company.taxId,
      company.email,
      company.phone,
      company.currencyCode,
      company.timezone,
      company.status,
      company.createdAt,
      company.updatedAt,
    );
  }
}