import api from '@/lib/axios'

export default {
  createPayer(data: object) {
    return api.post('/payers', data)
  },
  removePayer(id: string) {
    return api.delete(`/payers/${id}`)
  },
}
