<script lang="ts" setup>
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import type { Sheet } from '@/modules/common/interfaces/sheet.interface'

interface Props {
  sheets: Sheet[]
}

defineProps<Props>()

const emits = defineEmits(['remove-sheet'])

const handleClick = (sheetId: string) => {
  emits('remove-sheet', sheetId)
}
</script>

<template>
  <div
    v-for="sheet in sheets"
    :key="'sheet' + sheet._id"
    class="card bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm flex items-center justify-between overflow-hidden rounded-lg cursor-pointer flex-row group"
  >
    <RouterLink :to="`/${sheet._id}`" class="h-10 w-20"></RouterLink>
    <RouterLink
      :to="`/${sheet._id}`"
      class="flex items-center justify-center text-xl font-bold text-white w-full text-center truncate overflow-hidden whitespace-nowrap h-full"
    >
      {{ sheet.name }}
    </RouterLink>
    <div
      class="h-15 w-20 bg-blue-600 flex justify-center items-center opacity-0 remove-btn group-hover:opacity-100 hover:bg-blue-300"
      @click.stop="handleClick(sheet._id)"
    >
      <TrashIcon />
    </div>
  </div>
</template>

<style scoped>
.remove-btn {
  transition-property: opacity;
  transition-timing-function: var(
    --tw-ease,
    var(--default-transition-timing-function) /* cubic-bezier(0.4, 0, 0.2, 1) */
  );
  transition-duration: var(--tw-duration, var(--default-transition-duration) /* 150ms */);

  transition-property:
    color, background-color, border-color, outline-color, text-decoration-color, fill, stroke,
    --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(
    --tw-ease,
    var(--default-transition-timing-function) /* cubic-bezier(0.4, 0, 0.2, 1) */
  );
  transition-duration: var(--tw-duration, var(--default-transition-duration) /* 150ms */);
}
</style>
