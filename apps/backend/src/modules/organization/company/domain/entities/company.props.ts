import { BaseEntityProps } from '../../../../../core/domain/entities/base-entity.props';
import { CompanyStatus } from '../enums/company-status.enum';

export interface CompanyProps extends BaseEntityProps {
  name: string;
  legalName: string | null;
  taxId: string | null;
  email: string | null;
  phone: string | null;
  currencyCode: string;
  timezone: string;
  status: CompanyStatus;
}