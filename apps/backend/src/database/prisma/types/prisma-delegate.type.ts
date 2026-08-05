export type PrismaDelegate<TEntity> = {
  findMany(args: any): Promise<TEntity[]>;

  count(args: any): Promise<number>;
};
