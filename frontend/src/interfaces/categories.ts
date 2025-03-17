import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';

export interface ICategoriesFilterState {
  name: string,
  type: FinancialTypeEnum | 'all'
}

export interface ICategory {
  category_id: number;
  name: string;
  user_id?: string | null; // Until release
  type: FinancialTypeEnum;
  created_at: Date;
  updated_at: Date;
}