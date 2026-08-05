import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

import { UpdateWarehouseCommand } from './update-warehouse.command';
import { UpdateWarehouseResult } from './update-warehouse.result';

@Injectable()
export class UpdateWarehouseUseCase {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  async execute(
    command: UpdateWarehouseCommand,
  ): Promise<UpdateWarehouseResult> {
    const warehouse = await this.warehouseRepository.findById(command.id);

    if (!warehouse) {
      throw new NotFoundException(`Warehouse '${command.id}' not found.`);
    }

    if (warehouse.code !== command.code) {
      const existingWarehouse =
        await this.warehouseRepository.findByBranchAndCode(
          warehouse.branchId,
          command.code,
        );

      if (existingWarehouse && existingWarehouse.id !== warehouse.id) {
        throw new ConflictException(
          `Warehouse with code '${command.code}' already exists for this branch.`,
        );
      }
    }

    warehouse.update({
      code: command.code,
      name: command.name,
      description: command.description,
    });

    const updated = await this.warehouseRepository.update(warehouse);

    return new UpdateWarehouseResult(
      updated.id,
      updated.name,
      updated.status.toString(),
    );
  }
}
