import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';
import { CategoryTypeEnum } from '@/interfaces/enum/CategoryTypeEnum';

export interface ICategoriesFilterState {
  name: string,
  type: FinancialTypeEnum | 'all' | ''
  categoryType: CategoryTypeEnum | 'all' | ''
}

export interface ICategory {
  category_id: number;
  name: string;
  user_id?: string | null; // Until release
  type: FinancialTypeEnum;
  created_at: Date;
  updated_at: Date;
}

export interface ICategoriesCreateState {
  name: string,
  type: FinancialTypeEnum
}