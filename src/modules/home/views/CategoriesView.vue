<script lang="ts" setup>
import AddButton from '@/modules/common/components/AddButton.vue'
import { useUserStore } from '@/stores/user.store'
import { onMounted, onUnmounted, ref } from 'vue'
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import EditIcon from '@/modules/common/icons/EditIcon.vue'
import NewCategoryModal from '../components/NewCategoryModal.vue'
import CategoryAPI from '@/api/CategoryAPI'
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
    showNewCategoryModal.value = true
  }
}

const showNewCategoryModal = ref(false)
const showModalConfirmation = ref(false)
const selectedCategoryId = ref('')

const createCategory = async (categoryName: string) => {
  await CategoryAPI.createCategory({ name: categoryName })
  await userStore.getUserCategories()
  showNewCategoryModal.value = false
}

const openRemoveConfirmation = (categoryId: string) => {
  selectedCategoryId.value = categoryId
  showModalConfirmation.value = true
}

const removeCategory = async () => {
  await CategoryAPI.removeCategory(selectedCategoryId.value)
  await userStore.getUserCategories()
  showModalConfirmation.value = false
}
</script>

<template>
  <main class="flex flex-col justify-between w-full p-4">
    <h1 class="text-4xl font-bold text-center mb-4">Categorías</h1>
    <div v-if="userStore.userCategories.length" class="overflow-x-auto overflow-y-auto w-full">
      <table class="table">
        <tbody>
          <!-- row 1 -->
          <tr v-for="category in userStore.userCategories" class="hover:bg-base-300">
            <td class="text-lg">{{ category.name }}</td>
            <td class="text-right">
              <!-- <button class="rounded-full hover:bg-gray-300 transition-colors p-2 cursor-pointer">
                <EditIcon height="30px" width="30px" />
              </button> -->
              <button
                @click="openRemoveConfirmation(category._id)"
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
      Aún no tienes ninguna categoría
    </h2>
  </main>
  <AddButton @onClick="showNewCategoryModal = true" />
  <NewCategoryModal
    :showModal="showNewCategoryModal"
    @createCategory="createCategory"
    @cancel="showNewCategoryModal = false"
  />
  <ConfirmationModal
    :showModal="showModalConfirmation"
    title="Eliminar esta categoría"
    message="¿Estás seguro de que quieres eliminar esta categoría?"
    @confirm="removeCategory"
    @cancel="showModalConfirmation = false"
  />
</template>

<style scoped></style>
