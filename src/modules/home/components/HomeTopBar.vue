<script lang="ts" setup>
import LogoutIcon from '@/modules/common/icons/LogoutIcon.vue'

defineEmits(['logout'])
</script>

<template>
  <div class="flex items-center justify-between bg-gray-200 h-[5vh]">
    <h2 class="text-4xl font-bold text-center ml-5">Presupuesto</h2>
    <div class="flex items-center h-full">
      <nav class="flex ml-auto items-center h-full font-semibold">
        <RouterLink
          :to="{ name: 'home' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            ' font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'home',
          }"
        >
          Hojas de gastos
        </RouterLink>
        <RouterLink
          :to="{ name: 'categories' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            ' font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'categories',
          }"
        >
          Categorías
        </RouterLink>
        <RouterLink
          :to="{ name: 'payers' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            ' font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'payers',
          }"
        >
          Pagadores
        </RouterLink>
        <button
          class="cursor-pointer bg-transparent hover:bg-gray-300 transition-colors h-full w-15 flex items-center justify-center"
          @click="$emit('logout')"
        >
          <LogoutIcon />
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
