<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user.store'
import { useExpenseStore } from '@/stores/expense.store'

import { formatCurrency, formatDate } from '@/helpers'

import AddButton from '@/modules/common/components/AddButton.vue'
import NewExpenseModal from '../components/NewExpenseModal.vue'
import ConfirmationModal from '@/modules/common/components/ConfirmationModal.vue'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import EditIcon from '@/modules/common/icons/EditIcon.vue'

import type { Expense } from '@/modules/common/interfaces/expense.interface'

const userStore = useUserStore()
const expenseStore = useExpenseStore()
const route = useRoute()
const sheetId = route.params.id as string

onMounted(async () => {
  userStore.setActiveSheetId(sheetId)
  await expenseStore.getUserCashExpenses()

  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === '+') {
    showNewExpenseModal.value = true
  }
}

const showModalConfirmation = ref(false)
const selectedExpenseId = ref('')
const showNewExpenseModal = ref(false)

const createCashExpense = async (newExpense: Expense) => {
  newExpense.sheetId = userStore.activeSheetId
  newExpense.type = 'cash'
  await expenseStore.createExpense(newExpense)
  await expenseStore.getUserCashExpenses()
  showNewExpenseModal.value = false
}

const deleteCashExpense = async () => {
  await expenseStore.deleteExpense(selectedExpenseId.value)
  await expenseStore.getUserCashExpenses()
  showModalConfirmation.value = false
  selectedExpenseId.value = ''
}

const openRemoveConfirmation = (expenseId: string) => {
  selectedExpenseId.value = expenseId
  showModalConfirmation.value = true
}
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-3xl font-bold mx-3 my-8">Gastos efectivo</h1>
    <main v-if="expenseStore.cashExpenses.length" class="flex justify-between max-h-[75vh]">
      <div class="overflow-x-auto overflow-y-auto w-3/4 mr-3">
        <table class="table">
          <!-- head -->
          <thead class="bg-blue-500 sticky top-0 z-10">
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Categoría</th>
              <th>Pagador</th>
              <th>Importe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="expense in expenseStore.cashExpenses" class="hover:bg-base-300">
              <td>{{ formatDate(expense.date) }}</td>
              <td>{{ expense.description }}</td>
              <td>{{ expense.category?.name }}</td>
              <td>{{ expense.payer?.name }}</td>
              <td>{{ formatCurrency(expense.amount) }}</td>
              <td class="flex">
                <!-- <button
                  @click=""
                  class="rounded-full hover:bg-gray-300 transition-colors p-1 cursor-pointer"
                >
                  <EditIcon height="30px" width="30px" color="#000000" />
                </button> -->
                <button
                  @click="openRemoveConfirmation(expense._id)"
                  class="rounded-full hover:bg-gray-300 transition-colors p-1 cursor-pointer"
                >
                  <TrashIcon height="30px" width="30px" color="#000000" />
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-blue-500 sticky bottom-0 z-10">
            <tr class="font-bold">
              <td>Total:</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ formatCurrency(expenseStore.totalCashExpenses) }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <aside class="overflow-x-auto overflow-y-auto w-1/4">
        <table class="table">
          <tbody>
            <tr v-for="category in expenseStore.uniqueCashCategories" class="hover:bg-base-300">
              <td>
                Total efectivo pagado <span class="font-semibold">{{ category.name }}:</span>
              </td>
              <td>
                {{
                  formatCurrency(
                    expenseStore.cashExpenses
                      .filter((expense) => expense.category._id === category._id)
                      .map((expense) => expense.amount)
                      .reduce((acc, amount) => acc + amount, 0),
                  )
                }}
              </td>
            </tr>
            <tr
              v-for="payer in expenseStore.uniqueCashPayers"
              class="bg-base-300 hover:bg-base-200"
            >
              <td>
                Total efectivo pagado <span class="font-semibold">{{ payer.name }}:</span>
              </td>
              <td>
                {{
                  formatCurrency(
                    expenseStore.cashExpenses
                      .filter((expense) => expense.payer._id === payer._id)
                      .map((expense) => expense.amount)
                      .reduce((acc, amount) => acc + amount, 0),
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </aside>
    </main>
    <div v-else-if="expenseStore.loading" class="flex justify-center my-10">
      <VueSpinnerDots class="mt-10" size="50" />
    </div>
    <h2 v-else class="text-2xl font-semibold mb-4 text-center mt-4">
      Aún no tienes ningún gasto efectivo
    </h2>
    <AddButton @onClick="showNewExpenseModal = true" />
    <NewExpenseModal
      :showModal="showNewExpenseModal"
      :payers="userStore.userPayers"
      :categories="userStore.userCategories"
      @cancel="showNewExpenseModal = false"
      @confirm="createCashExpense"
    />
    <ConfirmationModal
      :showModal="showModalConfirmation"
      title="Eliminar gasto efectivo"
      message="¿Estás seguro de que quieres eliminar este gasto?"
      @confirm="deleteCashExpense"
      @cancel="showModalConfirmation = false"
    />
  </div>
</template>
