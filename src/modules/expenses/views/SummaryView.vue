<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { Chart, Grid, Tooltip, Bar } from 'vue3-charts'

import { useExpenseStore } from '@/stores/expense.store'
import { useUserStore } from '@/stores/user.store'

import { formatCurrency } from '@/helpers'

const userStore = useUserStore()
const expenseStore = useExpenseStore()
const route = useRoute()
const sheetId = route.params.id as string

onMounted(async () => {
  userStore.setActiveSheetId(sheetId)
  await expenseStore.getUserIncomes()
  await expenseStore.getUserFixedExpenses()
  await expenseStore.getUserVariableExpenses()
  await expenseStore.getUserCashExpenses()

  data.value = [
    { Concepto: 'Ingresos', Cantidad: expenseStore.totalIncomes },
    { Concepto: 'Gasto fijo', Cantidad: expenseStore.totalFixedExpenses },
    { Concepto: 'Gasto variable', Cantidad: expenseStore.totalVariableExpenses },
    { Concepto: 'Gasto efectivo', Cantidad: expenseStore.totalCashExpenses },
  ]
})

const data = ref()

const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
})

const width = ref(window.innerWidth * 0.5)
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-3xl font-bold mx-3 mt-8">Resumen</h1>
    <div v-if="!expenseStore.loading">
      <div class="flex flex-col w-full mx-10 mt-10">
        <h2 class="text-2xl font-bold mb-4">Balance del período</h2>
        <Chart :size="{ width, height: 400 }" :data="data" direction="horizontal" :margin="margin">
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Bar :dataKeys="['Concepto', 'Cantidad']" :barStyle="{ fill: '#2196F3' }" />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#2196F3"
              :config="{
                Cantidad: { color: '#2196F3', format: (value: number) => formatCurrency(value) },
              }"
            />
          </template>
        </Chart>
      </div>
      <div class="flex bg-gray-100 rounded-lg shadow-lg p-4 mt-10 mx-5">
        <div class="flex flex-col w-full">
          <h2 class="text-2xl font-bold mb-4">Resumen</h2>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <p class="text-lg font-semibold">Total Ingresos:</p>
              <p class="text-lg font-semibold">Total Gastos Fijos:</p>
              <p class="text-lg font-semibold">Total Gastos Variables:</p>
              <p class="text-lg font-semibold">Total Gastos Efectivo:</p>
              <p class="text-lg font-semibold">Total Gastos:</p>
              <p class="text-lg font-bold mt-3">Total Ahorro:</p>
            </div>
            <div class="flex flex-col text-right">
              <p class="text-lg">{{ formatCurrency(expenseStore.totalIncomes) }}</p>
              <p class="text-lg">{{ formatCurrency(expenseStore.totalFixedExpenses) }}</p>
              <p class="text-lg">{{ formatCurrency(expenseStore.totalVariableExpenses) }}</p>
              <p class="text-lg">{{ formatCurrency(expenseStore.totalCashExpenses) }}</p>
              <p class="text-lg">{{ formatCurrency(expenseStore.totalExpenses) }}</p>
              <p class="text-lg font-bold mt-3">{{ formatCurrency(expenseStore.savings) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center my-10">
      <VueSpinnerDots class="mt-10" size="50" />
    </div>
  </div>
</template>
