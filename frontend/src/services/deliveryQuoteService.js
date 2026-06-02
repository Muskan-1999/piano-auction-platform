import api from '../api/axios'

export async function submitDeliveryQuote(form) {
  const payload = {
    first_name:      form.firstName,
    last_name:       form.lastName,
    email:           form.email,
    phone:           form.phone,
    piano_make:      form.pianoMake      || null,
    piano_model:     form.pianoModel     || null,
    piano_type:      form.pianoType,
    estimated_value: form.estimatedValue || null,
    address_line_1:  form.address1,
    address_line_2:  form.address2       || null,
    city:            form.city,
    postcode:        form.postcode,
    has_stairs:      form.hasStairs === 'yes',
    num_stairs:      form.hasStairs === 'yes' && form.numStairs
      ? parseInt(form.numStairs, 10)
      : null,
    delivery_notes:  form.deliveryNotes  || null,
  }

  const response = await api.post('delivery-quotes', payload)
  return response.data
}
