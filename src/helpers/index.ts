export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0') // getMonth() es base 0
  const aaaa = date.getFullYear()

  return `${dd}/${mm}/${aaaa}`
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
