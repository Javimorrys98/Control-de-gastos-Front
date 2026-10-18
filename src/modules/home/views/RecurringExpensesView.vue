<script lang="ts" setup>
import AddButton from '@/modules/common/components/AddButton.vue'
import SortIcon from '@/modules/common/icons/SortIcon.vue'
import { useUserStore } from '@/stores/user.store'
import { onMounted, onUnmounted, ref } from 'vue'
import NewExpenseModal from '../../expenses/components/NewExpenseModal.vue'
import ExpenseAPI from '@/api/ExpenseAPI.ts'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import EditIcon from '@/modules/common/icons/EditIcon.vue'
import ConfirmationModal from '../../common/components/ConfirmationModal.vue'
import { formatCurrency } from '@/helpers'
import type { Expense } from '@/modules/common/interfaces/expense.interface.ts'

const userStore = useUserStore()

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === '+') {
    showNewRecurringExpenseModal.value = true
  }
}

const showNewRecurringExpenseModal = ref(false)
const showModalConfirmation = ref(false)
const selectedRecurringExpenseId = ref('')

const createRecurringExpense = async (newExpense: Expense) => {
  newExpense.type = 'fixed' //Entendemos que todos los gastos recurrentes son fijos, ya que se repiten cada mes.
  await ExpenseAPI.createRecurringExpense(newExpense)
  await userStore.getUserRecurringExpenses()
  showNewRecurringExpenseModal.value = false
}

const openRemoveConfirmation = (recurringExpenseId: string) => {
  selectedRecurringExpenseId.value = recurringExpenseId
  showModalConfirmation.value = true
}

const removeRecurringExpense = async () => {
  await ExpenseAPI.deleteRecurringExpense(selectedRecurringExpenseId.value)
  await userStore.getUserRecurringExpenses()
  showModalConfirmation.value = false
}
</script>

<template>
  <main class="flex flex-col justify-between w-full p-4">
    <h1 class="text-4xl font-bold text-center mb-4">Gastos recurrentes</h1>
    <div v-if="userStore.userRecurringExpenses.length" class="overflow-x-auto overflow-y-auto w-full">
      <table class="table">
        <!-- head -->
        <thead class="bg-[#9B83B5] sticky top-0 z-10">
          <tr>
            <th>Concepto</th>
            <th>Categoria</th>
            <th>Pagador</th>
            <th>Importe</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="expense in userStore.userRecurringExpenses" class="hover:bg-base-300" :key="expense._id">
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
      </table>
    </div>
    <VueSpinnerDots v-else-if="userStore.loading" class="mt-10" />
    <h2 v-else class="text-2xl font-semibold mb-4 text-center mt-4">
      Aún no tienes ningún gasto recurrente
    </h2>
  </main>
  <AddButton @onClick="showNewRecurringExpenseModal = true" />
  <NewExpenseModal
    :showModal="showNewRecurringExpenseModal"
    :payers="userStore.userPayers"
    :categories="userStore.userCategories"
    :templates="userStore.userTemplates"
    :isRecurringExpenseMode="true"
    @cancel="showNewRecurringExpenseModal = false"
    @confirm="createRecurringExpense"
  />
  <ConfirmationModal
    :showModal="showModalConfirmation"
    title="Eliminar este gasto recurrente"
    message="¿Estás seguro de que quieres eliminar este gasto recurrente?"
    @confirm="removeRecurringExpense"
    @cancel="showModalConfirmation = false"
  />
</template>

<style scoped>

</style>
