<script lang="ts" setup>
import AddButton from '@/modules/common/components/AddButton.vue'
import { ref } from 'vue'

const incomes = ref([
  {
    concept: 'Nomina Javi',
    amount: 1600.0,
  },
  {
    concept: 'Nomina Elia',
    amount: 5000.0,
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
          <thead class="bg-blue-500 sticky top-0 z-10">
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
          <tfoot class="bg-blue-500 sticky bottom-0 z-10">
            <tr>
              <td>Total:</td>
              <td>
                {{
                  incomes.map((expense) => expense.amount).reduce((acc, amount) => acc + amount, 0)
                }}
                €
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <AddButton />
    </main>
  </div>
</template>
