<script lang="ts" setup>
import AuthAPI from '@/api/AuthAPI'
import { useUserStore } from '@/stores/user.store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const userStore = useUserStore()

const formData = ref({
  name: '',
  email: '',
  password: '',
  password2: '',
})

const onRegister = async () => {
  if (formData.value.password !== formData.value.password2) {
    toast('Las contraseñas no coinciden', {
      type: 'error',
      autoClose: 2000,
    })
    return
  }

  await userStore.registerUser(formData.value)
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
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#9B83B5]"
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
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#9B83B5]"
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
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#9B83B5]"
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
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#9B83B5]"
        autocomplete="off"
      />
    </div>
    <!-- Actions -->
    <div class="flex flex-col gap-4">
      <button
        type="submit"
        class="bg-[#9B83B5] hover:bg-[#826B9A] transition-colors cursor-pointer text-white font-semibold rounded-md py-2 px-4 w-full flex items-center justify-center"
      >
        <span v-if="!userStore.loading">Registrarse</span>
        <VueSpinnerDots v-else size="20" color="white" />
      </button>
      <p>
        Si ya tienes una cuenta puedes
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold underline"
          :class="{ 'pointer-events-none': userStore.loading }"
          >iniciar sesión</RouterLink
        >.
      </p>
    </div>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-[#826B9A] text-center"></div>
</template>

<style scoped></style>
