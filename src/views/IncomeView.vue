<script lang="ts" setup>
import { ref } from 'vue';

const incomes = ref([
  {
    concept: 'Nomina Javi',
    amount: 1600.00,
  },
  {
    concept: 'Nomina Elia',
    amount: 5000.00,
  },
])
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-3xl font-bold mx-3 my-8">Ingresos</h1>
    <main class="max-h-[75vh]">
      <div class="overflow-x-auto overflow-y-auto w-full">
        <table class="table">
          <!-- head -->
          <thead class="bg-indigo-400 sticky top-0 z-10">
            <tr>
              <th>Concepto</th>
              <th>Importe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="income in incomes" class="hover:bg-base-300">
              <td>{{ income.concept }}</td>
              <td>{{ income.amount }} €</td>
              <td>E B</td>
            </tr>
          </tbody>
          <tfoot class="bg-indigo-400 sticky bottom-0 z-10">
            <tr>
              <td>Total:</td>
              <td>{{ incomes.map(expense => expense.amount).reduce((acc, amount) => acc + amount, 0) }} €</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  </div>
</template>
