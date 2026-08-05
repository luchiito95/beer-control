import { CreateBrandCommand } from '../../application/create-brand/create-brand.command';
import { UpdateBrandCommand } from '../../application/update-brand/update-brand.command';

import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

export class BrandCommandMapper {
  static toCreate(dto: CreateBrandDto): CreateBrandCommand {
    return new CreateBrandCommand(
      dto.companyId,
      dto.code,
      dto.name,
      dto.description ?? null,
    );
  }

  static toUpdate(id: string, dto: UpdateBrandDto): UpdateBrandCommand {
    return new UpdateBrandCommand(
      id,
      dto.code!,
      dto.name!,
      dto.description ?? null,
    );
  }
}
