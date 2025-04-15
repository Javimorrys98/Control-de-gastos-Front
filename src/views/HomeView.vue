<script lang='ts' setup>
const sheets = [
  {
    id: 1,
    name: 'Enero',
  },
  {
    id: 2,
    name: 'Febrero',
  },
  {
    id: 3,
    name: 'Marzo',
  },
  {
    id: 4,
    name: 'Abril',
  },
  {
    id: 5,
    name: 'Mayo',
  },
  {
    id: 6,
    name: 'Junio',
  },
  {
    id: 7,
    name: 'Julio',
  },
  {
    id: 8,
    name: 'Agosto',
  },
  {
    id: 9,
    name: 'Septiembre',
  },
  {
    id: 10,
    name: 'Octubre',
  },
  {
    id: 11,
    name: 'Noviembre',
  },
  {
    id: 12,
    name: 'Diciembre',
  },

]
</script>

<template>
  <div class="h-screen flex flex-col items-center  p-4">
    <p>Bienvenido Usuario</p>
    <h1 class="text-2xl font-bold mb-4">Selecciona una hoja</h1>
    <div class="grid w-full gap-4 p-4" :class="'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'">
      <RouterLink :to="`/${sheet.id}`" v-for="sheet in sheets" :key="'sheet' + sheet.id">
        <div class="card bg-orange-300 shadow-sm flex items-center justify-center p-6 rounded-lg">
          <h2 class="text-lg font-semibold">{{ sheet.name }}</h2>
        </div>
      </RouterLink>
    </div>
    <RouterLink :to="{ name: 'login' }">
      Cerrar sesión
    </RouterLink>
    <button>Crear nueva hoja</button>
  </div>

</template>

<style scoped></style>
