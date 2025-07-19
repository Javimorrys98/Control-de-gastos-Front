<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  showModal: boolean
}
defineProps<Props>()

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

const emits = defineEmits(['createSheet', 'cancel'])

const onCreateSheet = () => {
  if (sheetName.value.trim() === '') {
    return
  }

  emits('createSheet', sheetName.value)
  sheetName.value = ''
}

const onCancel = () => {
  sheetName.value = ''
  emits('cancel')
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
        @keypress.enter="onCreateSheet"
      />

      <div class="flex justify-end gap-3 mt-6">
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
</template>
