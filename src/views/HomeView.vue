<script lang="ts" setup>
import SheetAPI from '@/api/SheetAPI'
import NewSheetModal from '@/components/NewSheetModal.vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

const createSheet = async (sheetName: string) => {
  await SheetAPI.createSheet({ name: sheetName })
  await userStore.getUserSheets()
}

const onLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="h-screen flex flex-col items-center p-4">
    <p v-if="userStore.user">Bienvenido {{ userStore.user.name }}</p>
    <div v-if="userStore.userSheets.length" class="w-full">
      <h1 class="text-2xl font-bold mb-4">Selecciona una hoja</h1>
      <div
        class="grid w-full gap-4 p-4"
        :class="'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'"
      >
        <RouterLink
          :to="`/${sheet._id}`"
          v-for="sheet in userStore.userSheets"
          :key="'sheet' + sheet._id"
        >
          <div class="card bg-orange-300 shadow-sm flex items-center justify-center p-6 rounded-lg">
            <h2 class="text-lg font-semibold">{{ sheet.name }}</h2>
          </div>
        </RouterLink>
      </div>
    </div>
    <h2 v-else>No hay ninguna hoja de gastos</h2>
    <div class="flex w-full p-4 gap-4">
      <button
        class="card bg-red-600 shadow-sm flex items-center justify-center p-3 rounded-lg w-full"
        @click="onLogout"
      >
        Cerrar sesión
      </button>
      <button
        class="card bg-orange-300 shadow-sm flex items-center justify-center p-3 rounded-lg w-full"
      >
        Crear nueva hoja
      </button>
    </div>
  </div>
  <NewSheetModal @create-sheet="createSheet" />
</template>

<style scoped></style>
