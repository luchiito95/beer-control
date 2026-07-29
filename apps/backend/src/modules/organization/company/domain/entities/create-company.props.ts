
export interface CreateCompanyProps {
  name: string;

  legalName: string | null;

  taxId: string | null;

  email: string | null;

  phone: string |null;

  currencyCode?: string;

  timezone?: string;
}