import { WarehouseStatus } from '../enums/warehouse-status.enum';

export interface WarehouseProps {
  id: string;

  branchId: string;

  code: string;

  name: string;

  description?: string | null;

  status: WarehouseStatus;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}