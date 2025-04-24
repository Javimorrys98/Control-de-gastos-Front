<script lang='ts' setup>

</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">¿Olvidaste tu contraseña?</h1>
  <form action="#" method="POST">
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input type="text" id="username" name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Actions -->
    <div class="flex flex-col gap-4">
      <button type="button" @click=""
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Enviar email de recuperación</button>
    </div>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">


  </div>
</template>

<style scoped></style>
