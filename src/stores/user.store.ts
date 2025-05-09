import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '@/api/AuthAPI'
import type { LoginData } from '@/modules/auth/interfaces/login.data.interface'
import type { User } from '@/modules/common/interfaces/user.interface'
import UserAPI from '@/api/UserAPI'
import type { Sheet } from '@/modules/common/interfaces/sheet.interface'
import type { Category } from '@/modules/common/interfaces/category.interface'
import type { Payer } from '@/modules/common/interfaces/payer.interface'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const user = ref<User>()
  const userSheets = ref<Sheet[]>([])
  const userCategories = ref<Category[]>([])
  const userPayers = ref<Payer[]>([])
  const activeSheetId = ref('')
  const loading = ref(true)

  async function initUser() {
    try {
      const { data } = await AuthAPI.auth()
      user.value = data
      await getUserSheets()
      await getUserCategories()
      await getUserPayers()
    } catch (error) {
      // console.log(error.response.data.msg)
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function getUserSheets() {
    if (!user.value) {
      return
    }
    await UserAPI.getUserSheets(user.value?._id).then(({ data }) => {
      userSheets.value = data
    })
  }

  async function getUserCategories() {
    if (!user.value) {
      return
    }
    await UserAPI.getUserCategories(user.value?._id).then(({ data }) => {
      userCategories.value = data
    })
  }

  async function getUserPayers() {
    if (!user.value) {
      return
    }
    await UserAPI.getUserPayers(user.value?._id).then(({ data }) => {
      userPayers.value = data
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

  function setActiveSheetId(id: string) {
    activeSheetId.value = id
  }

  // const getUserName = computed(() => (user.value?.name ? user.value.name : ''))

  return {
    user,
    userSheets,
    userCategories,
    userPayers,
    // getUserName,
    loading,
    activeSheetId,
    login,
    logout,
    initUser,
    getUserSheets,
    getUserCategories,
    getUserPayers,
    setActiveSheetId,
  }
})
