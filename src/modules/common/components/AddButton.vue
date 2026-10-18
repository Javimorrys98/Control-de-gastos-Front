<script lang="ts" setup>
import PlusIcon from '../icons/PlusIcon.vue'

defineEmits(['onClick'])
</script>

<template>
  <button
    class="btn fixed bottom-6 right-6 w-10 h-10 bg-[#9B83B5] hover:bg-[#826B9A] rounded-full flex items-center justify-center transition-colors cursor-pointer border-0"
    @click="$emit('onClick')"
  >
    <PlusIcon />
  </button>
</template>

<style scoped></style>
