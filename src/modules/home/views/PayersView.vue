<script lang="ts" setup>
import AddButton from '@/modules/common/components/AddButton.vue'
import { useUserStore } from '@/stores/user.store'
import { onMounted, onUnmounted, ref } from 'vue'
import NewPayerModal from '../components/NewPayerModal.vue'
import PayerAPI from '@/api/PayerAPI'
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
    showNewPayerModal.value = true
  }
}

const showNewPayerModal = ref(false)
const showModalConfirmation = ref(false)
const selectedPayerId = ref('')

const createPayer = async (payerName: string) => {
  await PayerAPI.createPayer({ name: payerName })
  await userStore.getUserPayers()
  showNewPayerModal.value = false
}

const openRemoveConfirmation = (payerId: string) => {
  selectedPayerId.value = payerId
  showModalConfirmation.value = true
}

const removePayer = async () => {
  await PayerAPI.removePayer(selectedPayerId.value)
  await userStore.getUserPayers()
  showModalConfirmation.value = false
}
</script>

<template>
  <main class="flex flex-col justify-between w-full p-4">
    <h1 class="text-4xl font-bold text-center mb-4">Pagadores</h1>
    <div v-if="userStore.userPayers.length" class="overflow-x-auto overflow-y-auto w-full">
      <table class="table">
        <tbody>
          <!-- row 1 -->
          <tr v-for="payer in userStore.userPayers" class="hover:bg-base-300">
            <td class="text-lg">{{ payer.name }}</td>
            <td class="text-right">
              <!-- <button class="rounded-full hover:bg-gray-300 transition-colors p-2 cursor-pointer">
                <EditIcon height="30px" width="30px" />
              </button> -->
              <button
                @click="openRemoveConfirmation(payer._id)"
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
      Aún no tienes ningún pagador
    </h2>
  </main>
  <AddButton @onClick="showNewPayerModal = true" />
  <NewPayerModal
    :showModal="showNewPayerModal"
    @createPayer="createPayer"
    @cancel="showNewPayerModal = false"
  />
  <ConfirmationModal
    :showModal="showModalConfirmation"
    title="Eliminar este pagador"
    message="¿Estás seguro de que quieres eliminar este pagador?"
    @confirm="removePayer"
    @cancel="showModalConfirmation = false"
  />
</template>

<style scoped></style>
