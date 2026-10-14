import api from '@/lib/axios'

export default {
  createTemplate(data: object) {
    return api.post('/templates', data)
  },
  removeTemplate(id: string) {
    return api.patch(`/templates/${id}/remove`)
  },
}
