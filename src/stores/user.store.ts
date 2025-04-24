import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '@/api/AuthAPI'
import type { LoginData } from '@/interfaces/login.data.interface'
import type { User } from '@/interfaces/user.interface'
import UserAPI from '@/api/UserAPI'
import type { Sheet } from '@/interfaces/sheet.interface'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const user = ref<User>()
  const userSheets = ref<Sheet[]>([])
  const loading = ref(true)

  async function initUser() {
    try {
      const { data } = await AuthAPI.auth()
      user.value = data
      await getUserSheets()
    } catch (error) {
      // console.log(error.response.data.msg)
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function getUserSheets() {
    console.log('Getting user sheets')
    if (!user.value) {
      console.log('No tengo usuario')
      return
    }
    console.log(user.value)
    await UserAPI.getUserSheets(user.value?._id).then(({ data }) => {
      console.log('Entro en el then')
      console.log(data)
      userSheets.value = data
    })
  }

  async function login(formData: LoginData) {
    try {
      const {
        data: { token },
      } = await AuthAPI.login(formData)
      localStorage.setItem('AUTH_TOKEN_CG', token)
      await router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    localStorage.removeItem('AUTH_TOKEN_CG')
    user.value = undefined
    router.push({ name: 'login' })
  }

  // const getUserName = computed(() => (user.value?.name ? user.value.name : ''))

  return {
    user,
    userSheets,
    // getUserName,
    loading,
    login,
    logout,
    initUser,
    getUserSheets,
  }
})
