import api from '@/lib/axios'

export default {
  createExpense(data: object) {
    return api.post('/expenses', data)
  },
  deleteExpense(sheetId: string, expenseId: string) {
    return api.delete(`/expenses/${sheetId}/${expenseId}`)
  },
}
