import type { Category } from './category.interface'
import type { Payer } from './payer.interface'

export interface Expense {
  _id: string
  date: string
  description: string
  category: Category
  amount: number
  payer: Payer
  type: string
  sheetId: string
}
