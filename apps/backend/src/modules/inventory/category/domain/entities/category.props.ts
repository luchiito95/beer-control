import { CategoryStatus } from '../enums/category-status.enum';

export interface CategoryProps {
  id: string;

  companyId: string;

  code: string;

  name: string;

  description?: string | null;

  status: CategoryStatus;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}