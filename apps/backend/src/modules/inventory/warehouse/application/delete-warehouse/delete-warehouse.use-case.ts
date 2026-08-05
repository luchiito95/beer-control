import { Injectable, NotFoundException } from '@nestjs/common';

import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

import { DeleteWarehouseCommand } from './delete-warehouse.command';
import { DeleteWarehouseResult } from './delete-warehouse.result';

@Injectable()
export class DeleteWarehouseUseCase {
  constructor(private readonly repository: WarehouseRepository) {}

  async execute(
    command: DeleteWarehouseCommand,
  ): Promise<DeleteWarehouseResult> {
    const warehouse = await this.repository.findById(command.id);

    if (!warehouse) {
      throw new NotFoundException(`Warehouse '${command.id}' not found.`);
    }

    await this.repository.softDelete(command.id);

    return new DeleteWarehouseResult('Warehouse deleted successfully.');
  }
}
