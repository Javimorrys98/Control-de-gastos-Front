<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { formatCurrency } from '@/helpers'
import { useUserStore } from '@/stores/user.store'

interface Props {
  showModal: boolean
}
const props = defineProps<Props>()

const userStore = useUserStore()

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    onCancel()
  } else if (e.key === 'Enter') {
    e.preventDefault() // Prevent default form submission
    onCreateSheet()
  }
}

const sheetName = ref('')
const sheetNameError = ref('')
const recurringExpensesDate = ref('')
const recurringExpensesDateError = ref('')
const isRecurringExpenseMode = ref(false)
const selectedRecurringExpenseIds = ref<string[]>([])
const allRecurringExpensesSelected = computed(
  () =>
    userStore.userRecurringExpenses.length > 0 &&
    selectedRecurringExpenseIds.value.length === userStore.userRecurringExpenses.length,
)

const emits = defineEmits(['createSheet', 'cancel'])

watch([isRecurringExpenseMode, () => props.showModal], ([isModeEnabled, isModalOpen]) => {
  if (isModeEnabled && isModalOpen) {
    selectedRecurringExpenseIds.value = userStore.userRecurringExpenses.map((expense) => expense._id)
  }
})

const toggleAllRecurringExpenses = () => {
  selectedRecurringExpenseIds.value = allRecurringExpensesSelected.value
    ? []
    : userStore.userRecurringExpenses.map((expense) => expense._id)
}

const onCreateSheet = () => {
  if (sheetName.value.trim() === '') {
    sheetNameError.value = 'El nombre de la hoja es obligatorio.'
    return
  }

  const selectedExpenses =
    isRecurringExpenseMode.value && selectedRecurringExpenseIds.value.length
      ? userStore.userRecurringExpenses
          .filter((expense) => selectedRecurringExpenseIds.value.includes(expense._id))
          .map((expense) => ({
            date: recurringExpensesDate.value,
            description: expense.description,
            category: expense.category._id,
            amount: expense.amount,
            payer: expense.payer._id,
            type: 'fixed',
          }))
      : []

  if (selectedExpenses.length && !recurringExpensesDate.value) {
    recurringExpensesDateError.value = 'Selecciona una fecha para los gastos recurrentes.'
    return
  }

  emits('createSheet', { name: sheetName.value, recurringExpenses: selectedExpenses })
  sheetName.value = ''
  sheetNameError.value = ''
  recurringExpensesDate.value = ''
  recurringExpensesDateError.value = ''
  isRecurringExpenseMode.value = false
  selectedRecurringExpenseIds.value = []
}

const onCancel = () => {
  sheetName.value = ''
  sheetNameError.value = ''
  recurringExpensesDate.value = ''
  recurringExpensesDateError.value = ''
  isRecurringExpenseMode.value = false
  selectedRecurringExpenseIds.value = []
  emits('cancel')
}
</script>

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
      <!-- Botón de cerrar -->
      <button
        @click="onCancel"
        class="absolute top-2 right-4 text-gray-500 hover:text-black text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>

      <!-- Título -->
      <h2 class="text-2xl font-bold mb-1">Crear nueva hoja de gastos</h2>

      <!-- Input para el nombre de la hoja -->
      <label class="text-md text-gray-700 mb-2">Nombre de la hoja de gastos:</label>
      <input
        type="text"
        class="input h-8 mt-3 w-full"
        v-model="sheetName"
        :aria-invalid="Boolean(sheetNameError)"
        @input="sheetNameError = ''"
        @keypress.enter="onCreateSheet"
      />
      <p v-if="sheetNameError" class="mt-1 text-sm text-red-600">
        {{ sheetNameError }}
      </p>

      <section v-if="isRecurringExpenseMode" class="mt-5">
        <div class="mb-2">
          <h2 class="text-xl font-semibold">Gastos recurrentes</h2>
        </div>
        <div class="flex flex-col space-y-1 mb-3">
            <label for="recurringExpensesDate">Fecha de los gastos:</label>
            <input
              id="recurringExpensesDate"
              v-model="recurringExpensesDate"
              name="recurringExpensesDate"
              type="date"
              :required="selectedRecurringExpenseIds.length > 0"
              @input="recurringExpensesDateError = ''"
              class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="recurringExpensesDateError" class="text-sm text-red-600">
              {{ recurringExpensesDateError }}
            </p>
          </div>
        <div
          v-if="userStore.userRecurringExpenses.length"
          class="overflow-x-auto overflow-y-auto max-h-64 w-full"
        >
          <table class="table">
            <thead class="bg-blue-500 sticky top-0 z-10">
              <tr>
                <th class="flex text-center items-center justify-center">
                  <input
                    type="checkbox"
                    :checked="allRecurringExpensesSelected"
                    aria-label="Seleccionar o desmarcar todos los gastos recurrentes"
                    class="h-5 w-5 cursor-pointer accent-blue-900 outline-2 outline-white outline-offset-1"
                    @change="toggleAllRecurringExpenses"
                  />
                </th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Pagador</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="expense in userStore.userRecurringExpenses"
                :key="expense._id"
                class="hover:bg-base-300"
              >
                <td class="text-center align-middle">
                  <input
                    v-model="selectedRecurringExpenseIds"
                    type="checkbox"
                    :value="expense._id"
                    :aria-label="`Seleccionar ${expense.description}`"
                    class="cursor-pointer"
                  />
                </td>
                <td>{{ expense.description }}</td>
                <td>{{ expense.category?.name }}</td>
                <td>{{ expense.payer?.name }}</td>
                <td>{{ formatCurrency(expense.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <VueSpinnerDots v-else-if="userStore.loading" class="mt-4" />
        <p v-else class="text-center mt-4">Aún no tienes ningún gasto recurrente</p>
        <p v-if="selectedRecurringExpenseIds.length" class="text-sm mt-2">
          {{ selectedRecurringExpenseIds.length }} gasto(s) seleccionado(s)
        </p>
      </section>

      <div class="flex justify-between items-center mt-6">
        <div class="flex gap-3">
          <div
            class="flex items-center gap-3"
            :class="{ 'cursor-not-allowed': !userStore.userRecurringExpenses.length }"
            :title="
              userStore.userRecurringExpenses.length
                ? undefined
                : 'No puedes activar el modo de gastos recurrentes porque no tienes ninguno creado'
            "
          >
            <label class="switch">
              <input
                v-model="isRecurringExpenseMode"
                type="checkbox"
                id="isRecurringExpenseMode"
                :disabled="!userStore.userRecurringExpenses.length"
              />
              <span class="slider"></span>
            </label>
            <span>Modo gastos recurrentes</span>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button
            @click="onCancel"
            class="card bg-red-500 hover:bg-red-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
          >
            Cancelar
          </button>
          <button
            @click="onCreateSheet"
            class="card bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 26px;
    transition: 0.3s;
  }

  .switch input:disabled + .slider {
    cursor: not-allowed;
  }

  .slider::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
  }

  .switch input:checked + .slider {
    background-color: var(--color-blue-500);
  }

  .switch input:checked + .slider::before {
    transform: translateX(24px);
  }

  .switch input:focus-visible + .slider {
    outline: 2px solid #2563eb;
    outline-offset: 3px;
  }
</style>
