import { Injectable, NotFoundException } from '@nestjs/common';

import { BranchRepository } from '../../domain/repositories/branch.repository';

import { DeleteBranchCommand } from './delete-branch.command';
import { DeleteBranchResult } from './delete-branch.result';

@Injectable()
export class DeleteBranchUseCase {
  constructor(private readonly repository: BranchRepository) {}

  async execute(command: DeleteBranchCommand): Promise<DeleteBranchResult> {
    const branch = await this.repository.findById(command.id);

    if (!branch) {
      throw new NotFoundException(`Branch '${command.id}' not found.`);
    }

    await this.repository.softDelete(command.id);

    return new DeleteBranchResult('Branch deleted successfully.');
  }
}
