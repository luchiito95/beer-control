import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BranchRepository } from '../../domain/repositories/branch.repository';
import { UpdateBranchCommand } from './update-branch.command';
import { UpdateBranchResult } from './update-branch.result';

@Injectable()
export class UpdateBranchUseCase {
  constructor(
    private readonly branchRepository: BranchRepository,
  ) {}

  async execute(
    command: UpdateBranchCommand,
  ): Promise<UpdateBranchResult> {

    const branch = await this.branchRepository.findById(command.id);

    if (!branch) {
      throw new NotFoundException(
        `Branch '${command.id}' not found.`,
      );
    }

    if (branch.code !== command.code) {
      const existingBranch =
        await this.branchRepository.findByCompanyAndCode(
          branch.companyId,
          command.code,
        );

      if (existingBranch && existingBranch.id !== branch.id) {
        throw new ConflictException(
          `Branch with code '${command.code}' already exists for this company.`,
        );
      }
    }

    branch.update({
      code: command.code,
      name: command.name,
      email: command.email,
      phone: command.phone,
      address: command.address,
      city: command.city,
      state: command.state,
      country: command.country,
      postalCode: command.postalCode,
      timezone: command.timezone,
    });

    const updated =
      await this.branchRepository.update(branch);

    return new UpdateBranchResult(
      updated.id,
      updated.name,
      updated.status.toString(),
    );
  }
}