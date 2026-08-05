import { CreateUnitCommand } from '../../application/create-unit/create-unit.command';
import { UpdateUnitCommand } from '../../application/update-unit/update-unit.command';

import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';

export class UnitCommandMapper {
  static toCreate(dto: CreateUnitDto): CreateUnitCommand {
    return new CreateUnitCommand(
      dto.companyId,
      dto.code,
      dto.name,
      dto.symbol,
      dto.description ?? null,
    );
  }

  static toUpdate(id: string, dto: UpdateUnitDto): UpdateUnitCommand {
    return new UpdateUnitCommand(
      id,
      dto.code!,
      dto.name!,
      dto.symbol!,
      dto.description ?? null,
    );
  }
}
