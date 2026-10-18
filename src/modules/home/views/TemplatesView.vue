<script lang="ts" setup>
import AddButton from '@/modules/common/components/AddButton.vue'
import { useUserStore } from '@/stores/user.store'
import { onMounted, onUnmounted, ref } from 'vue'
import NewTemplateModal from '../components/NewTemplateModal.vue'
import TemplateAPI from '@/api/TemplateAPI.ts'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import EditIcon from '@/modules/common/icons/EditIcon.vue'
import ConfirmationModal from '../../common/components/ConfirmationModal.vue'

const userStore = useUserStore()

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === '+') {
    showNewTemplateModal.value = true
  }
}

const showNewTemplateModal = ref(false)
const showModalConfirmation = ref(false)
const selectedTemplateId = ref('')

const createTemplate = async (payload: { name: string; category: string }) => {
  await TemplateAPI.createTemplate({
    name: payload.name,
    category: payload.category,
  })
  await userStore.getUserTemplates()
  showNewTemplateModal.value = false
}

const openRemoveConfirmation = (templateId: string) => {
  selectedTemplateId.value = templateId
  showModalConfirmation.value = true
}

const removeTemplate = async () => {
  await TemplateAPI.removeTemplate(selectedTemplateId.value)
  await userStore.getUserTemplates()
  showModalConfirmation.value = false
}
</script>

<template>
  <main class="flex flex-col justify-between w-full p-4">
    <h1 class="text-4xl font-bold text-center mb-4">Plantillas</h1>
    <div v-if="userStore.userTemplates.length" class="overflow-x-auto overflow-y-auto w-full">
      <table class="table">
        <thead>
          <tr class="bg-[#9B83B5] sticky top-0 z-10">
            <th>Descripción</th>
            <th>Categoría</th>
            <th class="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="template in userStore.userTemplates" class="hover:bg-base-300">
            <td class="text-lg">{{ template.name }}</td>
            <td class="text-lg">{{ template.category?.name }}</td>
            <td class="text-right">
              <!-- <button class="rounded-full hover:bg-gray-300 transition-colors p-2 cursor-pointer">
                <EditIcon height="30px" width="30px" />
              </button> -->
              <button
                @click="openRemoveConfirmation(template._id)"
                class="rounded-full hover:bg-gray-300 transition-colors p-2 cursor-pointer"
              >
                <TrashIcon height="30px" width="30px" color="#000000" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <VueSpinnerDots v-else-if="userStore.loading" class="mt-10" />
    <h2 v-else class="text-2xl font-semibold mb-4 text-center mt-4">
      Aún no tienes ninguna plantilla
    </h2>
  </main>
  <AddButton @onClick="showNewTemplateModal = true" />
  <NewTemplateModal
    :showModal="showNewTemplateModal"
    :categories="userStore.userCategories"
    @createTemplate="createTemplate"
    @cancel="showNewTemplateModal = false"
  />
  <ConfirmationModal
    :showModal="showModalConfirmation"
    title="Eliminar esta plantilla"
    message="¿Estás seguro de que quieres eliminar esta plantilla?"
    @confirm="removeTemplate"
    @cancel="showModalConfirmation = false"
  />
</template>

<style scoped></style>
