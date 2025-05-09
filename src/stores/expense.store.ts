import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Expense } from '@/modules/common/interfaces/expense.interface'
import UserAPI from '@/api/UserAPI'
import ExpenseAPI from '@/api/ExpenseAPI'
import { useUserStore } from './user.store'
import type { Payer } from '@/modules/common/interfaces/payer.interface'
import type { Category } from '@/modules/common/interfaces/category.interface'

const userStore = useUserStore()
export const useExpenseStore = defineStore('expense', () => {
  //Fixed expenses
  const fixedExpenses = ref<Expense[]>([])

  const totalFixedExpenses = computed(() => {
    return fixedExpenses.value.reduce((acc, expense) => acc + expense.amount, 0)
  })

  const uniqueFixedPayers = computed(() => {
    return fixedExpenses.value.reduce((acc, expense) => {
      if (!acc.find((e) => expense.payer._id === e._id)) {
        acc.push(expense.payer)
      }
      return acc
    }, [] as Payer[])
  })

  const uniqueFixedCategories = computed(() => {
    return fixedExpenses.value.reduce((acc, expense) => {
      if (!acc.find((e) => expense.category._id === e._id)) {
        acc.push(expense.category)
      }
      return acc
    }, [] as Category[])
  })

  const getUserFixedExpenses = async () => {
    await UserAPI.getUserFixedExpenses(userStore.user?._id!, userStore.activeSheetId).then(
      ({ data }) => {
        fixedExpenses.value = data
      },
    )
  }

  // Variable expenses
  const variableExpenses = ref<Expense[]>([])

  const totalVariableExpenses = computed(() => {
    return variableExpenses.value.reduce((acc, expense) => acc + expense.amount, 0)
  })

  const uniqueVariablePayers = computed(() => {
    return variableExpenses.value.reduce((acc, expense) => {
      if (!acc.find((e) => expense.payer._id === e._id)) {
        acc.push(expense.payer)
      }
      return acc
    }, [] as Payer[])
  })

  const uniqueVariableCategories = computed(() => {
    return variableExpenses.value.reduce((acc, expense) => {
      if (!acc.find((e) => expense.category._id === e._id)) {
        acc.push(expense.category)
      }
      return acc
    }, [] as Category[])
  })

  const getUserVariableExpenses = async () => {
    await UserAPI.getUserVariableExpenses(userStore.user?._id!, userStore.activeSheetId).then(
      ({ data }) => {
        variableExpenses.value = data
      },
    )
  }

  // Cash expenses
  const cashExpenses = ref<Expense[]>([])
  const totalCashExpenses = computed(() => {
    return cashExpenses.value.reduce((acc, expense) => acc + expense.amount, 0)
  })
  const uniqueCashPayers = computed(() => {
    return cashExpenses.value.reduce((acc, expense) => {
      if (!acc.find((e) => expense.payer._id === e._id)) {
        acc.push(expense.payer)
      }
      return acc
    }, [] as Payer[])
  })
  const uniqueCashCategories = computed(() => {
    return cashExpenses.value.reduce((acc, expense) => {
      if (!acc.find((e) => expense.category._id === e._id)) {
        acc.push(expense.category)
      }
      return acc
    }, [] as Category[])
  })
  const getUserCashExpenses = async () => {
    await UserAPI.getUserCashExpenses(userStore.user?._id!, userStore.activeSheetId).then(
      ({ data }) => {
        cashExpenses.value = data
      },
    )
  }

  const createExpense = async (expense: Expense) => {
    await ExpenseAPI.createExpense(expense)
  }

  const deleteExpense = async (expenseId: string) => {
    await ExpenseAPI.deleteExpense(userStore.activeSheetId, expenseId)
  }
  return {
    // Fixed expenses
    fixedExpenses,
    totalFixedExpenses,
    uniqueFixedPayers,
    uniqueFixedCategories,
    getUserFixedExpenses,
    // Variable expenses
    variableExpenses,
    totalVariableExpenses,
    uniqueVariableCategories,
    uniqueVariablePayers,
    getUserVariableExpenses,
    // Cash expenses
    cashExpenses,
    totalCashExpenses,
    uniqueCashCategories,
    uniqueCashPayers,
    getUserCashExpenses,
    // Common
    createExpense,
    deleteExpense,
  }
})
