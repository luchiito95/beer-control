import { CreateBranchCommand } from '../../application/create-branch/create-branch.command';
import { UpdateBranchCommand } from '../../application/update-branch/update-branch.command';

import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';

export class BranchCommandMapper {
  static toCreate(dto: CreateBranchDto): CreateBranchCommand {
    return new CreateBranchCommand(
      dto.companyId,

      dto.code,

      dto.name,

      dto.email ?? null,

      dto.phone ?? null,

      dto.address ?? null,

      dto.city,

      dto.state ?? null,

      dto.country,

      dto.postalCode ?? null,

      dto.timezone ?? 'America/Bogota',
    );
  }

  static toUpdate(id: string, dto: UpdateBranchDto): UpdateBranchCommand {
    return new UpdateBranchCommand(
      id,

      dto.code!,

      dto.name!,

      dto.email ?? null,

      dto.phone ?? null,

      dto.address ?? null,

      dto.city!,

      dto.state ?? null,

      dto.country!,

      dto.postalCode ?? null,

      dto.timezone ?? 'America/Bogota',
    );
  }
}
