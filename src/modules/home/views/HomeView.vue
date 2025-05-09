<script lang="ts" setup>
import SheetAPI from '@/api/SheetAPI'
import NewSheetModal from '@/modules/home/components/NewSheetModal.vue'
import { useUserStore } from '@/stores/user.store'
import HomeTopBar from '../components/HomeTopBar.vue'
import SheetCard from '../components/SheetCard.vue'
import ConfirmationModal from '../../common/components/ConfirmationModal.vue'
import { ref } from 'vue'
import PlusIcon from '@/modules/common/icons/PlusIcon.vue'
import AddButton from '@/modules/common/components/AddButton.vue'

const userStore = useUserStore()

const showModalConfirmation = ref(false)
const selectedSheetId = ref<string>('')

const showNewSheetModal = ref(false)

const createSheet = async (sheetName: string) => {
  await SheetAPI.createSheet({ name: sheetName })
  await userStore.getUserSheets()
  showNewSheetModal.value = false
}

const openRemoveConfirmation = (sheetId: string) => {
  selectedSheetId.value = sheetId
  showModalConfirmation.value = true
}

const removeSheet = async () => {
  await SheetAPI.removeSheet(selectedSheetId.value)
  await userStore.getUserSheets()
  showModalConfirmation.value = false
  selectedSheetId.value = ''
}
</script>

<template>
  <div class="flex flex-col items-center p-4">
    <h1 class="text-4xl font-bold text-center">Hojas de gastos</h1>
    <div v-if="userStore.userSheets.length" class="w-full mt-4">
      <h2 class="text-2xl font-semibold mb-4 text-center">Selecciona una hoja</h2>
      <div
        class="grid w-full gap-4"
        :class="'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10'"
      >
        <SheetCard :sheets="userStore.userSheets" @removeSheet="openRemoveConfirmation" />
      </div>
    </div>
    <h2 v-else class="text-2xl font-semibold mb-4 text-center mt-4">
      Aún no tienes ninguna hoja de gasto
    </h2>
  </div>
  <AddButton @onClick="showNewSheetModal = true" />
  <NewSheetModal
    :showModal="showNewSheetModal"
    @createSheet="createSheet"
    @cancel="showNewSheetModal = false"
  />
  <ConfirmationModal
    :showModal="showModalConfirmation"
    title="Eliminar hoja de gastos"
    message="¿Estás seguro de que quieres eliminar esta hoja?"
    @confirm="removeSheet"
    @cancel="showModalConfirmation = false"
  />
</template>

<style scoped></style>
