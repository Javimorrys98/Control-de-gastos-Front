<script lang="ts" setup>
import LogoutIcon from '@/modules/common/icons/LogoutIcon.vue'

defineEmits(['logout'])
</script>

<template>
  <div class="flex items-center justify-between bg-gray-200 h-[7vh]">
    <img class="w-45 ml-5" src="@/assets/logo.png" alt="Logo" />
    <div class="flex items-center h-full">
      <nav class="flex ml-auto items-center h-full font-semibold">
        <RouterLink
          :to="{ name: 'fixed' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            ' font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'fixed',
          }"
        >
          Gastos fijos
        </RouterLink>
        <RouterLink
          :to="{ name: 'variable' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            ' font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'variable',
          }"
        >
          Gastos variables
        </RouterLink>
        <RouterLink
          :to="{ name: 'cash' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            ' font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'cash',
          }"
        >
          Gastos efectivo
        </RouterLink>
        <RouterLink
          :to="{ name: 'income' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            'font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'income',
          }"
        >
          Ingresos
        </RouterLink>
        <RouterLink
          :to="{ name: 'summary' }"
          class="h-full flex items-center hover:bg-gray-300 px-2 cursor-pointer transition-colors"
          :class="{
            'font-semibold border-b-2 border-blue-600 bg-gray-300': $route.name === 'summary',
          }"
        >
          Resumen
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
