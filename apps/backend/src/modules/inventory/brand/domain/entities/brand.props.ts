import { BrandStatus } from '../enums/brand-status.enum';

export interface BrandProps {
  id: string;

  companyId: string;

  code: string;

  name: string;

  description?: string | null;

  status: BrandStatus;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
