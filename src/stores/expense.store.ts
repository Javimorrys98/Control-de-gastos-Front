import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import UserAPI from '@/api/UserAPI'
import ExpenseAPI from '@/api/ExpenseAPI'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useUserStore } from './user.store'

import type { Expense } from '@/modules/common/interfaces/expense.interface'
import type { Payer } from '@/modules/common/interfaces/payer.interface'
import type { Category } from '@/modules/common/interfaces/category.interface'
import type { Income } from '@/modules/common/interfaces/income.interface'

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
    loading.value = true

    try {
      const { data } = await UserAPI.getUserFixedExpenses(
        userStore.user?._id!,
        userStore.activeSheetId,
      )
      fixedExpenses.value = data
    } catch (error) {
      toast('Error al cargar los gastos fijos', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
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
    loading.value = true

    try {
      const { data } = await UserAPI.getUserVariableExpenses(
        userStore.user?._id!,
        userStore.activeSheetId,
      )
      variableExpenses.value = data
    } catch (error) {
      toast('Error al cargar los gastos variables', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
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
    loading.value = true

    try {
      const { data } = await UserAPI.getUserCashExpenses(
        userStore.user?._id!,
        userStore.activeSheetId,
      )
      cashExpenses.value = data
    } catch (error) {
      toast('Error al cargar los gastos en efectivo', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  // Incomes
  const incomes = ref<Income[]>([])

  const totalIncomes = computed(() => {
    return incomes.value.reduce((acc, income) => acc + income.amount, 0)
  })

  const getUserIncomes = async () => {
    loading.value = true

    try {
      const { data } = await UserAPI.getUserIncomes(userStore.user?._id!, userStore.activeSheetId)
      incomes.value = data
    } catch (error) {
      toast('Error al cargar los ingresos', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  // Common
  const loading = ref(false)

  const createExpense = async (expense: Expense) => {
    loading.value = true
    try {
      await ExpenseAPI.createExpense(expense)
    } catch (error) {
      toast('Error al crear el gasto', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const deleteExpense = async (expenseId: string) => {
    loading.value = true
    try {
      await ExpenseAPI.deleteExpense(userStore.activeSheetId, expenseId)
    } catch (error) {
      toast('Error al eliminar el gasto', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const createIncome = async (income: Income) => {
    loading.value = true
    try {
      await ExpenseAPI.createIncome(income)
    } catch (error) {
      toast('Error al crear el ingreso', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const deleteIncome = async (incomeId: string) => {
    loading.value = true
    try {
      await ExpenseAPI.deleteIncome(userStore.activeSheetId, incomeId)
    } catch (error) {
      toast('Error al eliminar el ingreso', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const savings = computed(() => {
    return (
      totalIncomes.value -
      totalFixedExpenses.value -
      totalVariableExpenses.value -
      totalCashExpenses.value
    )
  })

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

    // Incomes
    incomes,
    totalIncomes,
    getUserIncomes,

    // Common
    createExpense,
    deleteExpense,
    createIncome,
    deleteIncome,
    loading,
    savings,
  }
})
