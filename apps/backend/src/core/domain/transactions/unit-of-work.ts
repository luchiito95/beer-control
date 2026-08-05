import { Prisma } from '@prisma/client';

export abstract class UnitOfWork {

  abstract execute<T>(
    work: (
      tx: Prisma.TransactionClient,
    ) => Promise<T>,
  ): Promise<T>;

}