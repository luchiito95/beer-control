import { CreateWarehouseCommand } from '../../application/create-warehouse/create-warehouse.command';
import { UpdateWarehouseCommand } from '../../application/update-warehouse/update-warehouse.command';

import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';

export class WarehouseCommandMapper {
  static toCreate(dto: CreateWarehouseDto): CreateWarehouseCommand {
    return new CreateWarehouseCommand(
      dto.branchId,
      dto.code,
      dto.name,
      dto.description ?? null,
    );
  }

  static toUpdate(id: string, dto: UpdateWarehouseDto): UpdateWarehouseCommand {
    return new UpdateWarehouseCommand(
      id,
      dto.code!,
      dto.name!,
      dto.description ?? null,
    );
  }
}
