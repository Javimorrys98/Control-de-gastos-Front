<script lang="ts" setup>
import { ref } from 'vue'

const sheetName = ref('')

const emits = defineEmits(['createSheet'])

const onCreateSheet = () => {
  const modal = document.getElementById('new_sheet_modal') as HTMLDialogElement

  if (sheetName.value.trim() === '') {
    return
  }

  emits('createSheet', sheetName.value)

  // Cerrar el modal
  modal.close()
  sheetName.value = ''
}
</script>

<template>
  <button
    class="btn fixed bottom-6 right-6 w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer border-0"
    onclick="new_sheet_modal.showModal()"
  >
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      stroke="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title></title>
        <g id="Complete">
          <g data-name="add" id="add-2">
            <g>
              <line
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="12"
                x2="12"
                y1="19"
                y2="5"
              ></line>
              <line
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="5"
                x2="19"
                y1="12"
                y2="12"
              ></line>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </button>
  <dialog id="new_sheet_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer text-xl">
          ✕
        </button>
      </form>
      <h3 class="text-xl font-bold">Crear nueva hoja de gastos</h3>
      <label>Nombre de la hoja de gastos:</label>
      <input type="text" class="input h-8 mt-3" v-model="sheetName" />

      <div class="flex justify-end mt-4 gap-2">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="card bg-red-600 shadow-sm flex items-center justify-center py-1 px-3 rounded-lg w-auto cursor-pointer"
          >
            Cancelar
          </button>
        </form>
        <button
          class="card bg-orange-300 shadow-sm flex items-center justify-center py-1 px-3 rounded-lg w-auto cursor-pointer"
          @click="onCreateSheet"
        >
          Crear
        </button>
      </div>
    </div>
  </dialog>
</template>
