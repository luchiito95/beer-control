import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CompanyRepository } from '../../../../organization/company/domain/repositories/company.repository';

import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryStatus } from '../../domain/enums/category-status.enum';
import { CategoryRepository } from '../../domain/repositories/category.repository';

import { CreateCategoryCommand } from './create-category.command';
import { CreateCategoryResult } from './create-category.result';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    command: CreateCategoryCommand,
  ): Promise<CreateCategoryResult> {

    const company =
      await this.companyRepository.findById(
        command.companyId,
      );

    if (!company) {
      throw new NotFoundException(
        `Company '${command.companyId}' not found.`,
      );
    }

    const existingCategory =
      await this.categoryRepository.findByCompanyAndCode(
        command.companyId,
        command.code,
      );

    if (existingCategory) {
      throw new ConflictException(
        `Category with code '${command.code}' already exists for this company.`,
      );
    }

    const category = new CategoryEntity({
      id: '',
      companyId: command.companyId,
      code: command.code,
      name: command.name,
      description: command.description,
      status: CategoryStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdCategory =
      await this.categoryRepository.create(category);

    return new CreateCategoryResult(
      createdCategory.id,
      createdCategory.name,
      createdCategory.status.toString(),
    );
  }
}