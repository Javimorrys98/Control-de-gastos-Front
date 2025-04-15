<template>
  <div class="flex items-center justify-between p-5 bg-orange-200 min-h-[10vh]">
    <h2 class="text-3xl font-bold text-center">Presupuesto</h2>
    <div class="flex items-center space-x-4">
      <nav class="flex ml-auto space-x-4 items-center sm:space-x-6">
        <div class="space-x-4">
          <RouterLink :to="{ name: 'fixed' }"> Gastos fijos </RouterLink>
          <RouterLink :to="{ name: 'variable' }"> Gastos variables </RouterLink>
          <RouterLink :to="{ name: 'cash' }"> Gastos efectivo </RouterLink>
          <RouterLink :to="{ name: 'income' }"> Ingresos </RouterLink>
          <RouterLink :to="{ name: 'summary' }"> Resumen </RouterLink>
        </div>
      </nav>
      <RouterLink :to="{ name: 'home' }"> Atrás </RouterLink>
      <RouterLink :to="{ name: 'login' }"> Cerrar sesión </RouterLink>
    </div>
  </div>
</template>
