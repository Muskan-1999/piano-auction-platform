import React from 'react'

const inputCls =
  'w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors'

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

export default function PersonalDetailsStep({ data, onChange, errors }) {
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" required error={errors.first_name}>
          <input
            type="text"
            name="first_name"
            value={data.first_name}
            onChange={handle}
            placeholder="First name"
            className={inputCls}
          />
        </Field>
        <Field label="Last Name" required error={errors.last_name}>
          <input
            type="text"
            name="last_name"
            value={data.last_name}
            onChange={handle}
            placeholder="Last name"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Email Address" required error={errors.email}>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handle}
          placeholder="Email address"
          className={inputCls}
        />
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handle}
          placeholder="Phone number"
          className={inputCls}
        />
      </Field>
    </div>
  )
}
