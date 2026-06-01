import api from '../api/axios'

export async function submitValuation(formData) {
  const payload = new FormData()

  const scalarFields = [
    'first_name', 'last_name', 'email', 'phone',
    'valuation_type',
    'piano_type', 'piano_make', 'piano_model', 'piano_colour',
    'serial_number', 'dimensions', 'age_of_piano',
    'ivory_keys', 'tuned_recently', 'reconditioned',
    'ownership_history', 'condition_description', 'additional_notes',
    'address_line_1', 'address_line_2', 'city', 'state', 'postcode', 'country',
    'collection_address_different',
    'preferred_contact_method', 'preferred_contact_time',
  ]

  scalarFields.forEach((field) => {
    const value = formData[field]
    if (value === undefined || value === null) return
    // FormData serialises booleans as "true"/"false" which Laravel rejects.
    // Send 1/0 instead so Laravel's boolean rule accepts them.
    if (typeof value === 'boolean') {
      payload.append(field, value ? '1' : '0')
    } else if (value !== '') {
      payload.append(field, value)
    }
  })

  if (Array.isArray(formData.images)) {
    formData.images.forEach((file) => {
      payload.append('images[]', file)
    })
  }

  const response = await api.post('sell-my-piano', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}
