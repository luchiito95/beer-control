import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BrandRepository } from '../../domain/repositories/brand.repository';

import { DeleteBrandCommand } from './delete-brand.command';
import { DeleteBrandResult } from './delete-brand.result';

@Injectable()
export class DeleteBrandUseCase {
  constructor(
    private readonly repository: BrandRepository,
  ) {}

  async execute(
    command: DeleteBrandCommand,
  ): Promise<DeleteBrandResult> {

    const brand =
      await this.repository.findById(command.id);

    if (!brand) {
      throw new NotFoundException(
        `Brand '${command.id}' not found.`,
      );
    }

    await this.repository.softDelete(command.id);

    return new DeleteBrandResult(
      'Brand deleted successfully.',
    );
  }
}