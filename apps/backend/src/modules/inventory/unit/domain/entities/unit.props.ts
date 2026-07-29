import { UnitStatus } from '../enums/unit-status.enum';

export interface UnitProps {
  id: string;

  companyId: string;

  code: string;

  name: string;

  symbol: string;

  description?: string | null;

  status: UnitStatus;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}