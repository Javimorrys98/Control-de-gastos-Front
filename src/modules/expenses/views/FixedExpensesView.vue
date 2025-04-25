<script lang="ts" setup>
import AddButton from '@/modules/common/components/AddButton.vue'
import { ref } from 'vue'
import NewFixedExpenseModal from '../components/NewFixedExpenseModal.vue'

const fixedExpenses = ref([
  {
    date: '01/01/2000',
    concept: 'Luz',
    classification: 'Luz',
    amount: 50.0,
    payer: 'Elia',
  },
  {
    date: '02/01/2000',
    concept: 'Agua',
    classification: 'Agua',
    amount: 30.0,
    payer: 'Javi',
  },
  {
    date: '03/01/2000',
    concept: 'Internet',
    classification: 'Internet',
    amount: 40.0,
    payer: 'Elia',
  },
  // {
  //   date: '01/01/2000',
  //   concept: 'Dientes Javi',
  //   classification: 'Dientes Javi',
  //   amount: 10.00,
  //   payer: 'Javi personal',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Luz',
  //   classification: 'Luz',
  //   amount: 50.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '02/01/2000',
  //   concept: 'Agua',
  //   classification: 'Agua',
  //   amount: 30.00,
  //   payer: 'Javi',
  // },
  // {
  //   date: '03/01/2000',
  //   concept: 'Internet',
  //   classification: 'Internet',
  //   amount: 40.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Dientes Javi',
  //   classification: 'Dientes Javi',
  //   amount: 10.00,
  //   payer: 'Javi personal',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Luz',
  //   classification: 'Luz',
  //   amount: 50.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '02/01/2000',
  //   concept: 'Agua',
  //   classification: 'Agua',
  //   amount: 30.00,
  //   payer: 'Javi',
  // },
  // {
  //   date: '03/01/2000',
  //   concept: 'Internet',
  //   classification: 'Internet',
  //   amount: 40.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Dientes Javi',
  //   classification: 'Dientes Javi',
  //   amount: 10.00,
  //   payer: 'Javi personal',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Luz',
  //   classification: 'Luz',
  //   amount: 50.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '02/01/2000',
  //   concept: 'Agua',
  //   classification: 'Agua',
  //   amount: 30.00,
  //   payer: 'Javi',
  // },
  // {
  //   date: '03/01/2000',
  //   concept: 'Internet',
  //   classification: 'Internet',
  //   amount: 40.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Dientes Javi',
  //   classification: 'Dientes Javi',
  //   amount: 10.00,
  //   payer: 'Javi personal',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Luz',
  //   classification: 'Luz',
  //   amount: 50.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '02/01/2000',
  //   concept: 'Agua',
  //   classification: 'Agua',
  //   amount: 30.00,
  //   payer: 'Javi',
  // },
  // {
  //   date: '03/01/2000',
  //   concept: 'Internet',
  //   classification: 'Internet',
  //   amount: 40.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Dientes Javi',
  //   classification: 'Dientes Javi',
  //   amount: 10.00,
  //   payer: 'Javi personal',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Luz',
  //   classification: 'Luz',
  //   amount: 50.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '02/01/2000',
  //   concept: 'Agua',
  //   classification: 'Agua',
  //   amount: 30.00,
  //   payer: 'Javi',
  // },
  // {
  //   date: '03/01/2000',
  //   concept: 'Internet',
  //   classification: 'Internet',
  //   amount: 40.00,
  //   payer: 'Elia',
  // },
  // {
  //   date: '01/01/2000',
  //   concept: 'Dientes Javi',
  //   classification: 'Dientes Javi',
  //   amount: 10.00,
  //   payer: 'Javi personal',
  // }
])

const uniquePayers = ref(Array.from(new Set(fixedExpenses.value.map((expense) => expense.payer))))

const showNewExpenseModal = ref(false)
</script>

<template>
  <div class="flex flex-col w-full">
    <h1 class="text-3xl font-bold mx-3 my-8">Gastos fijos</h1>
    <main class="flex justify-between max-h-[75vh]">
      <div class="overflow-x-auto overflow-y-auto w-3/4 mr-3">
        <table class="table">
          <!-- head -->
          <thead class="bg-blue-500 sticky top-0 z-10">
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
            <tr v-for="expense in fixedExpenses" class="hover:bg-base-300">
              <td>{{ expense.date }}</td>
              <td>{{ expense.concept }}</td>
              <td>{{ expense.classification }}</td>
              <td>{{ expense.payer }}</td>
              <td>{{ expense.amount }} €</td>
              <td>E B</td>
            </tr>
          </tbody>
          <tfoot class="bg-blue-500 sticky bottom-0 z-10">
            <tr>
              <td>Total:</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {{
                  fixedExpenses
                    .map((expense) => expense.amount)
                    .reduce((acc, amount) => acc + amount, 0)
                }}
                €
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <aside class="overflow-x-auto overflow-y-auto w-1/4">
        <table class="table">
          <tbody>
            <tr v-for="payer in uniquePayers" class="hover:bg-base-300">
              <td>Total fijo pagado {{ payer }}</td>
              <td>
                {{
                  fixedExpenses
                    .filter((expense) => expense.payer === payer)
                    .map((expense) => expense.amount)
                    .reduce((acc, amount) => acc + amount, 0)
                }}
                €
              </td>
            </tr>
          </tbody>
        </table>
      </aside>
      <AddButton @onClick="showNewExpenseModal = true" />
      <NewFixedExpenseModal
        :showModal="showNewExpenseModal"
        @cancel="showNewExpenseModal = false"
        @confirm="showNewExpenseModal = false"
      />
    </main>
  </div>
</template>
