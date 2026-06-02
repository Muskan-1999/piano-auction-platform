import api from '../api/axios'

export async function submitValuationRequest(formData) {
  const payload = new FormData()

  const scalarFields = [
    'first_name', 'last_name', 'email', 'phone',
    'valuation_type', 'piano_type', 'piano_make', 'piano_model',
    'piano_colour', 'serial_number', 'dimensions',
    'ivory_keys', 'tuned', 'reconditioned', 'ownership_history',
    'address_line_1', 'address_line_2', 'postcode', 'country',
  ]

  scalarFields.forEach((field) => {
    const value = formData[field]
    if (value === undefined || value === null || value === '') return
    payload.append(field, value)
  })

  if (Array.isArray(formData.images)) {
    formData.images.forEach((file) => {
      payload.append('images[]', file)
    })
  }

  const response = await api.post('value-my-piano', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}
