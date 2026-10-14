<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import type { Category } from '@/modules/common/interfaces/category.interface'

interface Props {
  showModal: boolean
  categories: Category[]
}

const props = defineProps<Props>()
const emits = defineEmits(['createTemplate', 'cancel'])

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
    e.preventDefault()
    handleSubmit()
  }
}

const templateForm = ref({
  name: {
    value: '',
    error: '',
  },
  category: {
    value: props.categories.length === 1 ? props.categories[0]._id : '',
    error: '',
  },
})

const handleSubmit = () => {
  Object.values(templateForm.value).forEach((field) => {
    field.error = ''
  })

  let valid = true

  Object.keys(templateForm.value).forEach((key) => {
    const field = templateForm.value[key as keyof typeof templateForm.value]
    if (field.value === '' || field.value === null) {
      field.error = 'Este campo es obligatorio.'
      valid = false
    }
  })

  if (!valid) {
    return
  }

  emits(
    'createTemplate',
    Object.fromEntries(
      Object.entries(templateForm.value).map(([key, field]) => [key, field.value]),
    ),
  )

  resetForm()
}

function closeForm() {
  emits('cancel')
  resetForm()
}

const resetForm = () => {
  Object.values(templateForm.value).forEach((field) => {
    field.value = ''
    field.error = ''
  })

  if (props.categories.length === 1) {
    templateForm.value.category.value = props.categories[0]._id
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
      <h2 class="text-2xl font-bold mb-1">Crear nueva plantilla</h2>

      <form id="templateForm" @submit.prevent="handleSubmit" class="space-y-4 mt-6">
        <div class="flex flex-col space-y-1">
          <label for="name" class="font-semibold">Nombre de la plantilla</label>
          <input
            v-model="templateForm.name.value"
            name="name"
            type="text"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="templateForm.name.error" class="text-sm text-red-600">
            {{ templateForm.name.error }}
          </p>
        </div>

        <div class="flex flex-col space-y-1">
          <label for="category" class="font-semibold">Categoría</label>
          <select
            v-model="templateForm.category.value"
            name="category"
            class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="category in categories" :value="category._id" :key="category._id">
              {{ category.name }}
            </option>
          </select>
          <p v-if="templateForm.category.error" class="text-sm text-red-600">
            {{ templateForm.category.error }}
          </p>
        </div>
      </form>

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="closeForm()"
          class="card bg-red-500 hover:bg-red-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          form="templateForm"
          class="card bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Crear
        </button>
      </div>
    </div>
  </div>
</template>
