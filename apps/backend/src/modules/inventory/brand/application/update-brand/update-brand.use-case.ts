import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BrandRepository } from '../../domain/repositories/brand.repository';

import { UpdateBrandCommand } from './update-brand.command';
import { UpdateBrandResult } from './update-brand.result';

@Injectable()
export class UpdateBrandUseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(command: UpdateBrandCommand): Promise<UpdateBrandResult> {
    const brand = await this.brandRepository.findById(command.id);

    if (!brand) {
      throw new NotFoundException(`Brand '${command.id}' not found.`);
    }

    if (brand.code !== command.code) {
      const existingBrand = await this.brandRepository.findByCompanyAndCode(
        brand.companyId,
        command.code,
      );

      if (existingBrand && existingBrand.id !== brand.id) {
        throw new ConflictException(
          `Brand with code '${command.code}' already exists for this company.`,
        );
      }
    }

    brand.update({
      code: command.code,
      name: command.name,
      description: command.description,
    });

    const updated = await this.brandRepository.update(brand);

    return new UpdateBrandResult(
      updated.id,
      updated.name,
      updated.status.toString(),
    );
  }
}
