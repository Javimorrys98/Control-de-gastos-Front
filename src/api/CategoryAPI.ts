import api from '@/lib/axios'

export default {
  createCategory(data: object) {
    return api.post('/categories', data)
  },
  removeCategory(id: string) {
    return api.delete(`/categories/${id}`)
  },
}
