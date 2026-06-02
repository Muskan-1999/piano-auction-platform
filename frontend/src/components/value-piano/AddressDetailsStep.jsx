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

const COUNTRIES = [
  'United Kingdom', 'United States', 'Canada', 'Australia', 'Ireland',
  'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium',
  'Switzerland', 'Austria', 'New Zealand', 'South Africa', 'Other',
]

export default function AddressDetailsStep({ data, onChange, errors }) {
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-4">

      <Field label="Address Line 1" required error={errors.address_line_1}>
        <input type="text" name="address_line_1" value={data.address_line_1} onChange={handle}
          placeholder="Street address" className={inputCls} />
      </Field>

      <Field label="Address Line 2" error={errors.address_line_2}>
        <input type="text" name="address_line_2" value={data.address_line_2} onChange={handle}
          placeholder="Apartment, suite, etc. (optional)" className={inputCls} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Postcode" required error={errors.postcode}>
          <input type="text" name="postcode" value={data.postcode} onChange={handle}
            placeholder="Postcode" className={inputCls} />
        </Field>

        <Field label="Country" required error={errors.country}>
          <div className="relative">
            <select name="country" value={data.country} onChange={handle} className={selectCls}>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▾</span>
          </div>
        </Field>
      </div>

    </div>
  )
}
