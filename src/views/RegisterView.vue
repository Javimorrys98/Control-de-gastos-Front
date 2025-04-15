<script lang='ts' setup>

</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Registrarse</h1>
  <form action="#" method="POST">
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input type="text" id="username" name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input type="password" id="password2" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Repeat Password Input -->
    <div class="mb-4">
      <label for="password2" class="block text-gray-600">Repite tu contraseña</label>
      <input type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Actions -->
    <div class="flex flex-col gap-4">
      <button type="button" @click=""
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Registrarse</button>
        <p>Si ya tienes una cuenta puedes <RouterLink :to="{name: 'login'}" class="font-semibold underline">iniciar sesión</RouterLink>.</p>
    </div>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">


  </div>
</template>

<style scoped></style>
