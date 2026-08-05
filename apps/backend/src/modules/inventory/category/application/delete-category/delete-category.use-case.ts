import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from '../../domain/repositories/category.repository';

import { DeleteCategoryCommand } from './delete-category.command';
import { DeleteCategoryResult } from './delete-category.result';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(command: DeleteCategoryCommand): Promise<DeleteCategoryResult> {
    const category = await this.repository.findById(command.id);

    if (!category) {
      throw new NotFoundException(`Category '${command.id}' not found.`);
    }

    await this.repository.softDelete(command.id);

    return new DeleteCategoryResult('Category deleted successfully.');
  }
}
