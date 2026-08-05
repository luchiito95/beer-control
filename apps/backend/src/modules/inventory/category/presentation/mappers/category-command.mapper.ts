import { CreateCategoryCommand } from '../../application/create-category/create-category.command';
import { UpdateCategoryCommand } from '../../application/update-category/update-category.command';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export class CategoryCommandMapper {
  static toCreate(dto: CreateCategoryDto): CreateCategoryCommand {
    return new CreateCategoryCommand(
      dto.companyId,

      dto.code,

      dto.name,

      dto.description ?? null,
    );
  }

  static toUpdate(id: string, dto: UpdateCategoryDto): UpdateCategoryCommand {
    return new UpdateCategoryCommand(
      id,

      dto.code!,

      dto.name!,

      dto.description ?? null,
    );
  }
}
