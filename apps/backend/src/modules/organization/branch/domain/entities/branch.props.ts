import { BranchStatus } from '../enums/branch-status.enum';

export interface BranchProps {
  id: string;

  companyId: string;

  code: string;

  name: string;

  email?: string | null;

  phone?: string | null;

  address?: string | null;

  city: string;

  state?: string | null;

  country: string;

  postalCode?: string | null;

  timezone: string;

  status: BranchStatus;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
