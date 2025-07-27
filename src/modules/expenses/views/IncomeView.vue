<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useExpenseStore } from '@/stores/expense.store'
import { useUserStore } from '@/stores/user.store'

import { formatCurrency } from '@/helpers'

import NewIncomeModal from '@/modules/expenses/components/NewIncomeModal.vue'
import ConfirmationModal from '@/modules/common/components/ConfirmationModal.vue'
import AddButton from '@/modules/common/components/AddButton.vue'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import EditIcon from '@/modules/common/icons/EditIcon.vue'
import SortIcon from '@/modules/common/icons/SortIcon.vue'

import type { Income } from '@/modules/common/interfaces/income.interface'

const userStore = useUserStore()
const expenseStore = useExpenseStore()
const route = useRoute()
const sheetId = route.params.id as string

onMounted(async () => {
  userStore.setActiveSheetId(sheetId)
  await expenseStore.getUserIncomes()

  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === '+') {
    showNewIncomeModal.value = true
  }
}

const showModalConfirmation = ref(false)
const selectedIncomeId = ref('')
const showNewIncomeModal = ref(false)

const createIncome = async (newIncome: Income) => {
  newIncome.sheetId = userStore.activeSheetId
  await expenseStore.createIncome(newIncome)
  await expenseStore.getUserIncomes()
  showNewIncomeModal.value = false
}

const deleteIncome = async () => {
  await expenseStore.deleteIncome(selectedIncomeId.value)
  await expenseStore.getUserIncomes()
  showModalConfirmation.value = false
  selectedIncomeId.value = ''
}
const openRemoveConfirmation = (incomeId: string) => {
  selectedIncomeId.value = incomeId
  showModalConfirmation.value = true
}
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-3xl font-bold mx-3 my-8">Ingresos</h1>
    <main v-if="expenseStore.incomes.length" class="max-h-[75vh]">
      <div class="overflow-x-auto overflow-y-auto w-full">
        <table class="table">
          <!-- head -->
          <thead class="bg-blue-500 sticky top-0 z-10">
            <tr>
              <th>
                <span class="flex gap-2"
                  >Concepto<SortIcon
                    class="cursor-pointer"
                    @click="expenseStore.sortExpenses('incomes', 'description')"
                /></span>
              </th>
              <th>
                <span class="flex gap-2"
                  >Importe<SortIcon
                    class="cursor-pointer"
                    @click="expenseStore.sortExpenses('incomes', 'amount')"
                /></span>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="income in expenseStore.incomes" class="hover:bg-base-300">
              <td>{{ income.description }}</td>
              <td>{{ formatCurrency(income.amount) }}</td>
              <td class="flex">
                <!-- <button
                  @click=""
                  class="rounded-full hover:bg-gray-300 transition-colors p-1 cursor-pointer"
                >
                  <EditIcon height="30px" width="30px" color="#000000" />
                </button> -->
                <button
                  @click="openRemoveConfirmation(income._id)"
                  class="rounded-full hover:bg-gray-300 transition-colors p-1 cursor-pointer"
                >
                  <TrashIcon height="30px" width="30px" color="#000000" />
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-blue-500 sticky bottom-0 z-10">
            <tr>
              <td>Total:</td>
              <td>
                {{ formatCurrency(expenseStore.totalIncomes) }}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
    <div v-else-if="expenseStore.loading" class="flex justify-center my-10">
      <VueSpinnerDots class="mt-10" size="50" />
    </div>
    <h2 v-else class="text-2xl font-semibold mb-4 text-center mt-4">
      Aún no tienes ningún ingreso
    </h2>
    <AddButton @onClick="showNewIncomeModal = true" />
    <NewIncomeModal
      :showModal="showNewIncomeModal"
      @cancel="showNewIncomeModal = false"
      @confirm="createIncome"
    />
    <ConfirmationModal
      :showModal="showModalConfirmation"
      title="Eliminar ingreso"
      message="¿Estás seguro de que quieres eliminar este ingreso?"
      @confirm="deleteIncome"
      @cancel="showModalConfirmation = false"
    />
  </div>
</template>
