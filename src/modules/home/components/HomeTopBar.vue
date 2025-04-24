<script lang="ts" setup>
interface Props {
  userName: string | undefined
}

defineProps<Props>()
defineEmits(['logout'])
</script>

<template>
  <div class="flex items-center justify-end w-full gap-4">
    <p>Bienvenid@ {{ userName }}</p>
    <button
      class="card bg-red-500 hover:bg-red-800 transition-colors cursor-pointer shadow-sm flex items-center justify-center px-3 py-1 rounded-lg text-white font-semibold"
      @click="$emit('logout')"
    >
      Cerrar sesión
    </button>
  </div>
</template>

<style scoped></style>
