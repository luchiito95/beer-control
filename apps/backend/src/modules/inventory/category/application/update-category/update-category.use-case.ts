import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryRepository } from '../../domain/repositories/category.repository';

import { UpdateCategoryCommand } from './update-category.command';
import { UpdateCategoryResult } from './update-category.result';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: UpdateCategoryCommand): Promise<UpdateCategoryResult> {
    const category = await this.categoryRepository.findById(command.id);

    if (!category) {
      throw new NotFoundException(`Category '${command.id}' not found.`);
    }

    if (category.code !== command.code) {
      const existingCategory =
        await this.categoryRepository.findByCompanyAndCode(
          category.companyId,
          command.code,
        );

      if (existingCategory && existingCategory.id !== category.id) {
        throw new ConflictException(
          `Category with code '${command.code}' already exists for this company.`,
        );
      }
    }

    category.update({
      code: command.code,
      name: command.name,
      description: command.description,
    });

    const updated = await this.categoryRepository.update(category);

    return new UpdateCategoryResult(
      updated.id,
      updated.name,
      updated.status.toString(),
    );
  }
}
