<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  showModal: boolean
}

defineProps<Props>()
const emits = defineEmits(['confirm', 'cancel'])

const expenseForm = ref({
  description: {
    value: '',
    error: '',
  },
  amount: {
    value: '',
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

  // Reiniciar el formulario
  Object.values(expenseForm.value).forEach((field) => {
    field.value = ''
  })
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
        @click="$emit('cancel')"
        class="absolute top-2 right-4 text-gray-500 hover:text-black text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>

      <!-- Título -->
      <h2 class="text-2xl font-bold mb-1">Crear nuevo ingreso</h2>

      <!-- Formulario -->
      <form id="expenseForm" @submit.prevent="handleSubmit" class="space-y-4 mt-6">
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
      </form>

      <!-- Botones -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="$emit('cancel')"
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
