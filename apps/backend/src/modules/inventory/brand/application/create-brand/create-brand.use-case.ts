import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CompanyRepository } from '../../../../organization/company/domain/repositories/company.repository';

import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandStatus } from '../../domain/enums/brand-status.enum';
import { BrandRepository } from '../../domain/repositories/brand.repository';

import { CreateBrandCommand } from './create-brand.command';
import { CreateBrandResult } from './create-brand.result';

@Injectable()
export class CreateBrandUseCase {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    command: CreateBrandCommand,
  ): Promise<CreateBrandResult> {

    const company =
      await this.companyRepository.findById(
        command.companyId,
      );

    if (!company) {
      throw new NotFoundException(
        `Company '${command.companyId}' not found.`,
      );
    }

    const existingBrand =
      await this.brandRepository.findByCompanyAndCode(
        command.companyId,
        command.code,
      );

    if (existingBrand) {
      throw new ConflictException(
        `Brand with code '${command.code}' already exists for this company.`,
      );
    }

    const brand = new BrandEntity({
      id: '',
      companyId: command.companyId,
      code: command.code,
      name: command.name,
      description: command.description,
      status: BrandStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdBrand =
      await this.brandRepository.create(brand);

    return new CreateBrandResult(
      createdBrand.id,
      createdBrand.name,
      createdBrand.status.toString(),
    );
  }
}