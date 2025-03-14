import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';

export interface ITransactionFilterState {
  name: string,
  type: FinancialTypeEnum | 'all'
  date: string
}