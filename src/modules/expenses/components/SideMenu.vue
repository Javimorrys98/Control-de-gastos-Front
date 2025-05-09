<script lang="ts" setup>
import BackArrowIcon from '@/modules/common/icons/BackArrowIcon.vue'
import FileIcon from '@/modules/common/icons/FileIcon.vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
</script>

<template>
  <aside class="bg-gray-200 w-60 min-h-[95vh] px-5">
    <div class="flex items-center gap-2">
      <h3 class="text-lg font-bold">Hojas de gastos</h3>
      <RouterLink :to="{ name: 'home' }">
        <BackArrowIcon />
      </RouterLink>
    </div>
    <div v-if="userStore.userSheets.length" class="mt-3 flex flex-col gap-2">
      <div
        v-for="sheet in userStore.userSheets"
        :key="`sidebar_sheet_${sheet._id}`"
        class="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-lg"
      >
        <FileIcon />
        <RouterLink
          :to="`/${sheet._id}`"
          class="truncate max-w-[10rem] overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {{ sheet.name }}
        </RouterLink>
      </div>
    </div>
    <p v-else class="text-sm text-gray-500 mx-4">No hay hojas</p>
  </aside>
</template>
