import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import AuthAPI from '@/api/AuthAPI'
import UserAPI from '@/api/UserAPI'

import type { LoginData } from '@/modules/auth/interfaces/login.data.interface'
import type { User } from '@/modules/common/interfaces/user.interface'
import type { Sheet } from '@/modules/common/interfaces/sheet.interface'
import type { Category } from '@/modules/common/interfaces/category.interface'
import type { Payer } from '@/modules/common/interfaces/payer.interface'
import type { RegisterData } from '@/modules/auth/interfaces/register.data.interface'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const user = ref<User>()
  const userSheets = ref<Sheet[]>([])
  const userCategories = ref<Category[]>([])
  const userPayers = ref<Payer[]>([])
  const activeSheetId = ref('')
  const loading = ref(false)

  async function initUser() {
    loading.value = true
    try {
      const { data } = await AuthAPI.auth()
      user.value = data
      await getUserSheets()
      await getUserCategories()
      await getUserPayers()
    } catch (error) {
      toast('Error al inicializar el usuario', {
        autoClose: 2000,
        type: 'error',
      })
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function getUserSheets() {
    if (!user.value) {
      return
    }
    loading.value = true

    try {
      const { data } = await UserAPI.getUserSheets(user.value._id)
      userSheets.value = data
    } catch (error) {
      toast('Error al cargar las hojas de gasto', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getUserCategories() {
    if (!user.value) {
      return
    }
    loading.value = true

    try {
      const { data } = await UserAPI.getUserCategories(user.value?._id)
      userCategories.value = data
    } catch (error) {
      toast('Error al cargar las categorías del usuario', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getUserPayers() {
    if (!user.value) {
      return
    }
    loading.value = true

    try {
      const { data } = await UserAPI.getUserPayers(user.value?._id)
      userPayers.value = data
    } catch (error) {
      toast('Error al cargar los pagadores del usuario', {
        autoClose: 2000,
        type: 'error',
      })
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function registerUser(newUserData: RegisterData) {
    loading.value = true
    try {
      const { data } = await AuthAPI.register(newUserData)
      toast(data.msg, {
        autoClose: 2000,
        type: 'success',
      })
      await new Promise((resolve) => setTimeout(resolve, 2200))
      router.push({ name: 'login' })
    } catch (error: any) {
      toast(error.response.data.msg, {
        autoClose: 2000,
        type: 'error',
      })
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function login(formData: LoginData) {
    loading.value = true
    try {
      const {
        data: { token },
      } = await AuthAPI.login(formData)
      localStorage.setItem('AUTH_TOKEN_CG', token)
      await router.push({ name: 'home' })
    } catch (error: any) {
      toast(error.response.data.msg, {
        autoClose: 2000,
        type: 'error',
      })
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    localStorage.removeItem('AUTH_TOKEN_CG')
    user.value = undefined
    router.push({ name: 'login' })
    toast('Sesión cerrada correctamente.', {
      autoClose: 2000,
      type: 'success',
    })
  }

  function setActiveSheetId(id: string) {
    activeSheetId.value = id
  }

  return {
    user,
    userSheets,
    userCategories,
    userPayers,
    loading,
    activeSheetId,
    registerUser,
    login,
    logout,
    initUser,
    getUserSheets,
    getUserCategories,
    getUserPayers,
    setActiveSheetId,
  }
})
