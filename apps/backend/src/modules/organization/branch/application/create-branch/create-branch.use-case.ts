import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BranchEntity } from '../../domain/entities/branch.entity';
import { BranchStatus } from '../../domain/enums/branch-status.enum';
import { BranchRepository } from '../../domain/repositories/branch.repository';

import { CompanyRepository } from '../../../company/domain/repositories/company.repository';

import { CreateBranchCommand } from '../create-branch/create-branch.command';
import { CreateBranchResult } from '../create-branch/create-branch.result';

@Injectable()
export class CreateBranchUseCase {
  constructor(
    private readonly branchRepository: BranchRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(command: CreateBranchCommand): Promise<CreateBranchResult> {
    const company = await this.companyRepository.findById(command.companyId);

    if (!company) {
      throw new NotFoundException(`Company '${command.companyId}' not found.`);
    }

    const existingBranch = await this.branchRepository.findByCompanyAndCode(
      command.companyId,
      command.code,
    );

    if (existingBranch) {
      throw new ConflictException(
        `Branch with code '${command.code}' already exists for this company.`,
      );
    }

    const branch = new BranchEntity({
      id: '',
      companyId: command.companyId,
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
      status: BranchStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    const createdBranch = await this.branchRepository.create(branch);

    return new CreateBranchResult(
      createdBranch.id,
      createdBranch.name,
      createdBranch.status.toString(),
    );
  }
}
