import React from 'react'

const inputCls =
  'w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors'

const selectCls =
  'w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-900 transition-colors appearance-none'

const labelCls = 'block text-xs font-semibold text-gray-700 mb-1'

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function SelectField({ label, required, error, name, value, onChange, options, placeholder }) {
  return (
    <Field label={label} required={required} error={error}>
      <div className="relative">
        <select name={name} value={value} onChange={onChange} className={selectCls}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▾</span>
      </div>
    </Field>
  )
}

const CONTACT_METHODS = [
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone' },
]

const CONTACT_TIMES = [
  { value: 'Morning',   label: 'Morning' },
  { value: 'Afternoon', label: 'Afternoon' },
  { value: 'Evening',   label: 'Evening' },
]

export default function AddressDetailsStep({ data, onChange, errors }) {
  const handle = (e) => {
    const { name, value, type, checked } = e.target
    onChange({ ...data, [name]: type === 'checkbox' ? checked : value })
  }

  return (
    <div className="space-y-4">

      {/* Address Line 1 */}
      <Field label="Address Line 1" required error={errors.address_line_1}>
        <input type="text" name="address_line_1" value={data.address_line_1} onChange={handle}
          placeholder="Street address" className={inputCls} />
      </Field>

      {/* Address Line 2 */}
      <Field label="Address Line 2" error={errors.address_line_2}>
        <input type="text" name="address_line_2" value={data.address_line_2} onChange={handle}
          placeholder="Apartment, suite, etc. (optional)" className={inputCls} />
      </Field>

      {/* Town / County */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Town / City" required error={errors.city}>
          <input type="text" name="city" value={data.city} onChange={handle}
            placeholder="Town or city" className={inputCls} />
        </Field>
        <Field label="County / State" error={errors.state}>
          <input type="text" name="state" value={data.state} onChange={handle}
            placeholder="County or state" className={inputCls} />
        </Field>
      </div>

      {/* Postcode / Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Postcode" required error={errors.postcode}>
          <input type="text" name="postcode" value={data.postcode} onChange={handle}
            placeholder="Postcode" className={inputCls} />
        </Field>
        <Field label="Country" required error={errors.country}>
          <input type="text" name="country" value={data.country} onChange={handle}
            placeholder="Country" className={inputCls} />
        </Field>
      </div>

      {/* Collection address different */}
      <div className="flex items-center gap-3">
        <input
          id="collection_address_different"
          type="checkbox"
          name="collection_address_different"
          checked={!!data.collection_address_different}
          onChange={handle}
          className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-0"
        />
        <label htmlFor="collection_address_different" className="text-sm text-gray-700 cursor-pointer select-none">
          Collection address is different from above
        </label>
      </div>

      {/* Contact preferences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Preferred Contact Method" required
          name="preferred_contact_method" value={data.preferred_contact_method}
          onChange={handle} options={CONTACT_METHODS}
          placeholder="Select method"
          error={errors.preferred_contact_method}
        />
        <SelectField
          label="Preferred Contact Time"
          name="preferred_contact_time" value={data.preferred_contact_time}
          onChange={handle} options={CONTACT_TIMES}
          placeholder="Select time"
          error={errors.preferred_contact_time}
        />
      </div>

    </div>
  )
}
