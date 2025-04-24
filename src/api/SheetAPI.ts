import api from '@/lib/axios'

export default {
  createSheet(data: object) {
    return api.post('/sheets', data)
  },
  removeSheet(id: string) {
    return api.delete(`/sheets/${id}`)
  },
}
