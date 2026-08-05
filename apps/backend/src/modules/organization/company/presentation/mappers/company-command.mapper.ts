import { CreateCompanyCommand } from '../../application/create-company/create-company.command';
import { UpdateCompanyCommand } from '../../application/update-company/update-company.command';

import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

export class CompanyCommandMapper {
  static toCreate(dto: CreateCompanyDto): CreateCompanyCommand {
    return new CreateCompanyCommand(
      dto.name,

      dto.legalName ?? null,

      dto.taxId ?? null,

      dto.email ?? null,

      dto.phone ?? null,

      dto.currencyCode ?? 'COP',

      dto.timezone ?? 'America/Bogota',
    );
  }

  static toUpdate(id: string, dto: UpdateCompanyDto): UpdateCompanyCommand {
    return new UpdateCompanyCommand(
      id,

      dto.name!,

      dto.legalName ?? null,

      dto.taxId ?? null,

      dto.email ?? null,

      dto.phone ?? null,

      dto.currencyCode ?? 'COP',

      dto.timezone ?? 'America/Bogota',
    );
  }
}
