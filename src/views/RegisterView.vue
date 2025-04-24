<script lang="ts" setup>
import AuthAPI from '@/api/AuthAPI'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  password2: '',
})

const onRegister = async () => {
  try {
    await AuthAPI.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
    })

    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Registrarse</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Nombre</label>
      <input
        v-model="formData.name"
        type="text"
        id="username"
        name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        v-model="formData.email"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        v-model="formData.password"
        type="password"
        id="password2"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Repeat Password Input -->
    <div class="mb-4">
      <label for="password2" class="block text-gray-600">Repite tu contraseña</label>
      <input
        v-model="formData.password2"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Actions -->
    <div class="flex flex-col gap-4">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Registrarse
      </button>
      <p>
        Si ya tienes una cuenta puedes
        <RouterLink :to="{ name: 'login' }" class="font-semibold underline"
          >iniciar sesión</RouterLink
        >.
      </p>
    </div>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center"></div>
</template>

<style scoped></style>
