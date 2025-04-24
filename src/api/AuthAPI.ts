import type { LoginData } from '@/modules/auth/interfaces/login.data.interface'
import type { RegisterData } from '@/modules/auth/interfaces/register.data.interface'
import api from '@/lib/axios'

export default {
  auth() {
    return api.get('/auth/user')
  },
  register(data: RegisterData) {
    return api.post('/auth/register', data)
  },
  login(data: LoginData) {
    return api.post('/auth/login', data)
  },
}
