import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BranchRepository } from '../../../../organization/branch/domain/repositories/branch.repository';

import { WarehouseEntity } from '../../domain/entities/warehouse.entity';
import { WarehouseStatus } from '../../domain/enums/warehouse-status.enum';
import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

import { CreateWarehouseCommand } from './create-warehouse.command';
import { CreateWarehouseResult } from './create-warehouse.result';

@Injectable()
export class CreateWarehouseUseCase {
  constructor(
    private readonly warehouseRepository: WarehouseRepository,
    private readonly branchRepository: BranchRepository,
  ) {}

  async execute(
    command: CreateWarehouseCommand,
  ): Promise<CreateWarehouseResult> {
    const branch = await this.branchRepository.findById(command.branchId);

    if (!branch) {
      throw new NotFoundException(`Branch '${command.branchId}' not found.`);
    }

    const existingWarehouse =
      await this.warehouseRepository.findByBranchAndCode(
        command.branchId,
        command.code,
      );

    if (existingWarehouse) {
      throw new ConflictException(
        `Warehouse with code '${command.code}' already exists for this branch.`,
      );
    }

    const warehouse = new WarehouseEntity({
      id: '',
      branchId: command.branchId,
      code: command.code,
      name: command.name,
      description: command.description,
      status: WarehouseStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdWarehouse = await this.warehouseRepository.create(warehouse);

    return new CreateWarehouseResult(
      createdWarehouse.id,
      createdWarehouse.name,
      createdWarehouse.status.toString(),
    );
  }
}
