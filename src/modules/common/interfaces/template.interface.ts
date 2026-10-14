import type { Category } from './category.interface'

export interface Template {
  _id: string
  name: string
  category: Category
  user: string
}
