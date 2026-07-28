export interface BaseEntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}