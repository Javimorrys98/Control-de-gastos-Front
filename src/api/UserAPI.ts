import api from '@/lib/axios'

export default {
  getUserSheets(userId: string) {
    return api.get(`/users/${userId}/sheets`)
  },
  getUserCategories(userId: string) {
    return api.get(`/users/${userId}/categories`)
  },
  getUserPayers(userId: string) {
    return api.get(`/users/${userId}/payers`)
  },
  getUserFixedExpenses(userId: string, sheetId: string) {
    return api.get(`/users/${userId}/${sheetId}/fixed-expenses`)
  },
  getUserVariableExpenses(userId: string, sheetId: string) {
    return api.get(`/users/${userId}/${sheetId}/variable-expenses`)
  },
  getUserCashExpenses(userId: string, sheetId: string) {
    return api.get(`/users/${userId}/${sheetId}/cash-expenses`)
  },
}
