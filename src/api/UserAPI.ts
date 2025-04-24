import api from '@/lib/axios'

export default {
  getUserSheets(userId: string) {
    return api.get(`/users/${userId}/sheets`)
  },
}
