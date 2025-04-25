<script lang="ts" setup>
import LogoutIcon from '@/modules/common/icons/LogoutIcon.vue'
interface Props {
  userName: string | undefined
}

defineProps<Props>()
defineEmits(['logout'])
</script>

<template>
  <div class="flex items-center justify-between w-full bg-gray-200 px-5">
    <h1 class="text-5xl font-bold text-center">Inicio</h1>
    <div class="flex items-center justify-end w-full gap-4">
      <p>Bienvenid@ {{ userName }}</p>
      <button
        class="cursor-pointer rounded-full bg-transparent hover:bg-gray-300 p-3 transition-colors"
        @click="$emit('logout')"
      >
        <LogoutIcon />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
