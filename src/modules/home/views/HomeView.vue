<script lang="ts" setup>
import SheetAPI from '@/api/SheetAPI'
import NewSheetModal from '@/modules/home/components/NewSheetModal.vue'
import { useUserStore } from '@/stores/user.store'
import HomeTopBar from '../components/HomeTopBar.vue'
import SheetCard from '../components/SheetCard.vue'

const userStore = useUserStore()

const createSheet = async (sheetName: string) => {
  await SheetAPI.createSheet({ name: sheetName })
  await userStore.getUserSheets()
}

const removeSheet = async (sheetId: string) => {
  await SheetAPI.removeSheet(sheetId)
  await userStore.getUserSheets()
}

const onLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="h-screen flex flex-col items-center p-4">
    <HomeTopBar :userName="userStore.user?.name" @logout="onLogout" />
    <h1 class="text-4xl font-bold text-center">Hojas de gastos</h1>
    <div v-if="userStore.userSheets.length" class="w-full mt-4">
      <h2 class="text-2xl font-semibold mb-4 text-center">Selecciona una hoja</h2>
      <div
        class="grid w-full gap-4"
        :class="'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10'"
      >
        <SheetCard :sheets="userStore.userSheets" @removeSheet="removeSheet" />
      </div>
    </div>
    <h2 v-else class="text-2xl font-semibold mb-4 text-center mt-4">
      Aún no tienes ninguna hoja de gasto
    </h2>
  </div>
  <NewSheetModal @create-sheet="createSheet" />
</template>

<style scoped></style>
