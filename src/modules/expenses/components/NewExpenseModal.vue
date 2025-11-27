<script lang="ts" setup>
import type { Category } from '@/modules/common/interfaces/category.interface'
import type { Payer } from '@/modules/common/interfaces/payer.interface'
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  showModal: boolean
  categories: Category[]
  payers: Payer[]
}

const props = defineProps<Props>()
const emits = defineEmits(['confirm', 'cancel'])

onMounted(() => {
  globalThis.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  globalThis.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeForm()
  } else if (e.key === 'Enter') {
    e.preventDefault() // Evita el envío del formulario por defecto
    handleSubmit()
  }
}

function closeForm() {
  emits('cancel')
  resetForm()
}

const expenseForm = ref({
  date: {
    value: '',
    error: '',
  },
  description: {
    value: '',
    error: '',
  },
  category: {
    value: props.categories.length === 1 ? props.categories[0]._id : '',
    error: '',
  },
  amount: {
    value: '',
    error: '',
  },
  payer: {
    value: props.payers.length === 1 ? props.payers[0]._id : '',
    error: '',
  },
})

const handleSubmit = () => {
  // Limpiar errores previos
  Object.values(expenseForm.value).forEach((field) => {
    field.error = ''
  })

  let valid = true

  // Validación de campos vacíos
  Object.keys(expenseForm.value).forEach((key) => {
    const field = expenseForm.value[key as keyof typeof expenseForm.value]
    if (field.value === '' || field.value === null) {
      field.error = 'Este campo es obligatorio.'
      valid = false
    }
  })

  // Validación de 'amount' > 0
  if (Number(expenseForm.value.amount.value) <= 0) {
    expenseForm.value.amount.error = 'El valor debe ser mayor que 0.'
    valid = false
  }

  if (!valid) {
    return
  }

  // Si todo es válido, emite el evento 'confirm'
  emits(
    'confirm',
    Object.fromEntries(Object.entries(expenseForm.value).map(([key, field]) => [key, field.value])),
  )

  resetForm()
}

const resetForm = () => {
  // Reiniciar el formulario
  Object.values(expenseForm.value).forEach((field) => {
    field.value = ''
    field.error = ''
  })

  // Reiniciar categoría y pagador si hay más de uno
  if (props.categories.length === 1) {
    expenseForm.value.category.value = props.categories[0]._id
  }
  if (props.payers.length === 1) {
    expenseForm.value.payer.value = props.payers[0]._id
  }
}
</script>

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
      <!-- Botón de cerrar -->
      <button
        @click="closeForm()"
        class="absolute top-2 right-4 text-gray-500 hover:text-black text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>

      <!-- Título -->
      <h2 class="text-2xl font-bold mb-1">Crear nuevo gasto</h2>

      <!-- Formulario -->
      <form id="expenseForm" @submit.prevent="handleSubmit" class="space-y-4 mt-6">
        <div class="flex flex-col space-y-1">
          <label for="date" class="font-semibold">Fecha</label>
          <input
            v-model="expenseForm.date.value"
            name="date"
            type="date"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="expenseForm.date.error" class="text-sm text-red-600">
            {{ expenseForm.date.error }}
          </p>
        </div>

        <div class="flex flex-col space-y-1">
          <label for="description" class="font-semibold">Descripción</label>
          <input
            v-model="expenseForm.description.value"
            name="description"
            type="text"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="expenseForm.description.error" class="text-sm text-red-600">
            {{ expenseForm.description.error }}
          </p>
        </div>

        <div class="flex flex-col space-y-1">
          <label for="category" class="font-semibold">Categoría</label>
          <select
            v-model="expenseForm.category.value"
            name="category"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="category in categories" :value="category._id" :key="category._id">
              {{ category.name }}
            </option>
          </select>
          <p v-if="expenseForm.category.error" class="text-sm text-red-600">
            {{ expenseForm.category.error }}
          </p>
        </div>

        <div class="flex flex-col space-y-1">
          <label for="amount" class="font-semibold">Valor</label>
          <input
            v-model="expenseForm.amount.value"
            name="amount"
            type="number"
            step="0.01"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="expenseForm.amount.error" class="text-sm text-red-600">
            {{ expenseForm.amount.error }}
          </p>
        </div>

        <div class="flex flex-col space-y-1">
          <label for="payer" class="font-semibold">Pagador</label>
          <select
            v-model="expenseForm.payer.value"
            name="payer"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="payer in payers" :value="payer._id" :key="payer._id">
              {{ payer.name }}
            </option>
          </select>
          <p v-if="expenseForm.payer.error" class="text-sm text-red-600">
            {{ expenseForm.payer.error }}
          </p>
        </div>
      </form>

      <!-- Botones -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="closeForm()"
          class="card bg-red-500 hover:bg-red-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          form="expenseForm"
          class="card bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Crear
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
