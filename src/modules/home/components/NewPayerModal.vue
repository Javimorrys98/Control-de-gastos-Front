<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

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
    onCreatePayer()
  }
}

const payerName = ref('')

const emits = defineEmits(['createPayer', 'cancel'])

const onCreatePayer = () => {
  if (payerName.value.trim() === '') {
    return
  }

  emits('createPayer', payerName.value)
  payerName.value = ''
}

const onCancel = () => {
  payerName.value = ''
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
      <h2 class="text-2xl font-bold mb-1">Crear nuevo pagador</h2>

      <!-- Input para el nombre de la hoja -->
      <label class="text-md text-gray-700 mb-2">Nombre del pagador:</label>
      <input
        type="text"
        class="input h-8 mt-3 w-full"
        v-model="payerName"
        @keypress.enter="onCreatePayer"
      />

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="onCancel"
          class="card bg-red-500 hover:bg-red-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Cancelar
        </button>
        <button
          @click="onCreatePayer"
          class="card bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Crear
        </button>
      </div>
    </div>
  </div>
</template>
