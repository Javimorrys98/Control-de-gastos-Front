<script lang="ts" setup>
import { ref } from 'vue';

const variableExpenses = ref([
  {
    date: '01/01/2000',
    concept: 'Mercadona',
    classification: 'Compras',
    amount: 150.00,
    payer: 'Javi',
  },
  {
    date: '02/01/2000',
    concept: 'Mondongo',
    classification: 'Wenijimo',
    amount: 30.00,
    payer: 'Javi personal',
  },
  {
    date: '03/01/2000',
    concept: 'Algo',
    classification: 'Brutal',
    amount: 40.00,
    payer: 'Elia',
  },
  {
    date: '01/01/2000',
    concept: 'Amazing ',
    classification: 'Salidas',
    amount: 10.00,
    payer: 'Javi personal',
  },
  {
    date: '01/01/2000',
    concept: 'Family ',
    classification: 'Compras',
    amount: 100.00,
    payer: 'Elia personal',
  },
  {
    date: '01/01/2000',
    concept: 'Mercadona',
    classification: 'Comprasq',
    amount: 150.00,
    payer: 'Javier',
  },
  {
    date: '02/01/2000',
    concept: 'Mondongo',
    classification: 'Wenijimos',
    amount: 30.00,
    payer: 'Javi personals',
  },
  {
    date: '03/01/2000',
    concept: 'Algo',
    classification: 'Brutals',
    amount: 40.00,
    payer: 'Elias',
  },
  {
    date: '01/01/2000',
    concept: 'Amazing ',
    classification: 'Salidass',
    amount: 10.00,
    payer: 'Javi personala',
  },
  {
    date: '01/01/2000',
    concept: 'Family ',
    classification: 'Comprass',
    amount: 100.00,
    payer: 'Elia personalx',
  },
  {
    date: '01/01/2000',
    concept: 'Amazing ',
    classification: 'Salidass',
    amount: 10.00,
    payer: 'Javi personala',
  },
  {
    date: '01/01/2000',
    concept: 'Family ',
    classification: 'Comprass',
    amount: 100.00,
    payer: 'Elia personalx',
  },
  {
    date: '01/01/2000',
    concept: 'Amazing ',
    classification: 'Salidass',
    amount: 10.00,
    payer: 'Javi personala',
  },
  {
    date: '01/01/2000',
    concept: 'Family ',
    classification: 'Comprass',
    amount: 100.00,
    payer: 'Elia personalx',
  },
  {
    date: '01/01/2000',
    concept: 'Amazing ',
    classification: 'Salidass',
    amount: 10.00,
    payer: 'Javi personala',
  },
  {
    date: '01/01/2000',
    concept: 'Family ',
    classification: 'Comprass',
    amount: 100.00,
    payer: 'Elia personalx',
  }
])

const uniquePayers = ref(Array.from(new Set(variableExpenses.value.map(expense => expense.payer))))

const uniqueClassifications = ref(Array.from(new Set(variableExpenses.value.map(expense => expense.classification))))
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-3xl font-bold mx-3 my-8">Gastos variables</h1>
    <main class="flex justify-between max-h-[75vh]">
      <div class="overflow-x-auto overflow-y-auto w-3/4 mr-3">
        <table class="table">
          <!-- head -->
          <thead class="bg-indigo-400 sticky top-0 z-10">
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Clasificación</th>
              <th>Pagador</th>
              <th>Importe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="expense in variableExpenses" class="hover:bg-base-300">
              <td>{{ expense.date }}</td>
              <td>{{ expense.concept }}</td>
              <td>{{ expense.classification }}</td>
              <td>{{ expense.payer }}</td>
              <td>{{ expense.amount }} €</td>
              <td>E B</td>
            </tr>
          </tbody>
          <tfoot class="bg-indigo-400 sticky bottom-0 z-10">
            <tr>
              <td>Total:</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{variableExpenses.map(expense => expense.amount).reduce((acc, amount) => acc + amount, 0)}} €</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <aside class="overflow-x-auto overflow-y-auto w-1/4">
        <table class="table">
          <tbody>
            <tr v-for="classification in uniqueClassifications" class="hover:bg-base-300">
              <td>Total pagado {{ classification }}</td>
              <td>{{variableExpenses.filter(expense => expense.classification === classification).map(expense =>
                expense.amount).reduce((acc, amount) => acc + amount, 0) }} €</td>
            </tr>
            <tr v-for="payer in uniquePayers" class="hover:bg-base-300">
              <td>Total fijo pagado {{ payer }}</td>
              <td>{{variableExpenses.filter(expense => expense.payer === payer).map(expense =>
                expense.amount).reduce((acc, amount) => acc + amount, 0) }} €</td>
            </tr>
          </tbody>
        </table>
      </aside>
    </main>
  </div>
</template>
