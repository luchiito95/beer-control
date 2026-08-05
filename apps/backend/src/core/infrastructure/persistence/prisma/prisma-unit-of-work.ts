import { Injectable } from '@nestjs/common';

import { PrismaService } from '@database/prisma';

import { UnitOfWork } from '@core/application/unit-of-work';

@Injectable()
export class PrismaUnitOfWork
  extends UnitOfWork {

  constructor(
    private readonly prisma: PrismaService,
  ) {

    super();

  }

  async execute<T>(
    work: () => Promise<T>,
  ): Promise<T> {

    return this.prisma.$transaction(

      async () => work(),

    );

  }

}