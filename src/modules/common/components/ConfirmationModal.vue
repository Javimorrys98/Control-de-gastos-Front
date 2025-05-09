<script lang="ts" setup>
interface Props {
  showModal: boolean
  title: string
  message: string
}

defineProps<Props>()
const emits = defineEmits(['confirm', 'cancel'])
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
      <h2 class="text-2xl font-bold mb-1">{{ title }}</h2>
      <p class="text-md text-gray-700mb-4">{{ message }}</p>

      <!-- Botones -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="$emit('cancel')"
          class="card bg-red-500 hover:bg-red-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Cancelar
        </button>
        <button
          @click="$emit('confirm')"
          class="card bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
