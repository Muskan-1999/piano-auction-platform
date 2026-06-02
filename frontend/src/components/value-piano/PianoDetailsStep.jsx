import React, { useRef } from 'react'

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

const VALUATION_TYPES = [
  { value: 'Auction Valuation',      label: 'Auction Valuation' },
  { value: 'Insurance Valuation',    label: 'Insurance Valuation' },
  { value: 'Probate Valuation',      label: 'Probate Valuation' },
  { value: 'Private Sale Valuation', label: 'Private Sale Valuation' },
]

const PIANO_TYPES = [
  { value: 'Upright Piano',    label: 'Upright Piano' },
  { value: 'Grand Piano',      label: 'Grand Piano' },
  { value: 'Baby Grand Piano', label: 'Baby Grand Piano' },
  { value: 'Digital Piano',    label: 'Digital Piano' },
  { value: 'Player Piano',     label: 'Player Piano' },
  { value: 'Other',            label: 'Other' },
]

const YES_NO     = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]
const IVORY_OPTS = [...YES_NO, { value: 'Unknown', label: 'Unknown' }]

export default function PianoDetailsStep({ data, onChange, errors }) {
  const fileRef = useRef(null)

  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value })

  const handleImages = (e) => {
    const files   = Array.from(e.target.files)
    const combined = [...(data.images || []), ...files].slice(0, 5)
    onChange({ ...data, images: combined })
  }

  const removeImage = (index) => {
    const updated = (data.images || []).filter((_, i) => i !== index)
    onChange({ ...data, images: updated })
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-5">

      {/* Valuation + Piano Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Valuation Type" required
          name="valuation_type" value={data.valuation_type}
          onChange={handle} options={VALUATION_TYPES}
          placeholder="Select valuation type"
          error={errors.valuation_type}
        />
        <SelectField
          label="Piano Type" required
          name="piano_type" value={data.piano_type}
          onChange={handle} options={PIANO_TYPES}
          placeholder="Select piano type"
          error={errors.piano_type}
        />
      </div>

      {/* Make + Model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Piano Make" required error={errors.piano_make}>
          <input type="text" name="piano_make" value={data.piano_make} onChange={handle}
            placeholder="e.g. Yamaha, Steinway" className={inputCls} />
        </Field>
        <Field label="Piano Model" error={errors.piano_model}>
          <input type="text" name="piano_model" value={data.piano_model} onChange={handle}
            placeholder="e.g. U1, Model D" className={inputCls} />
        </Field>
      </div>

      {/* Colour + Serial */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Piano Colour" error={errors.piano_colour}>
          <input type="text" name="piano_colour" value={data.piano_colour} onChange={handle}
            placeholder="e.g. Black, Mahogany" className={inputCls} />
        </Field>
        <Field label="Serial Number" error={errors.serial_number}>
          <input type="text" name="serial_number" value={data.serial_number} onChange={handle}
            placeholder="Serial number" className={inputCls} />
        </Field>
      </div>

      {/* Dimensions */}
      <Field label="Dimensions" error={errors.dimensions}>
        <input type="text" name="dimensions" value={data.dimensions} onChange={handle}
          placeholder="e.g. Height 120cm / Length 150cm" className={inputCls} />
      </Field>

      {/* Ivory Keys + Tuned + Reconditioned */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SelectField
          label="Ivory Keys"
          name="ivory_keys" value={data.ivory_keys}
          onChange={handle} options={IVORY_OPTS}
          placeholder="Select"
          error={errors.ivory_keys}
        />
        <SelectField
          label="Tuned"
          name="tuned" value={data.tuned}
          onChange={handle} options={YES_NO}
          placeholder="Select"
          error={errors.tuned}
        />
        <SelectField
          label="Reconditioned"
          name="reconditioned" value={data.reconditioned}
          onChange={handle} options={YES_NO}
          placeholder="Select"
          error={errors.reconditioned}
        />
      </div>

      {/* Ownership History */}
      <Field label="Ownership History" error={errors.ownership_history}>
        <textarea
          name="ownership_history" value={data.ownership_history} onChange={handle} rows={3}
          placeholder="Tell us briefly about the piano — how long you've owned it, where it came from, etc."
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* Image Upload */}
      <div>
        <label className={labelCls}>Piano Images</label>
        <p className="text-xs text-gray-500 mb-2">Maximum 5 images · jpg, jpeg, png, webp · 5MB each</p>
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleImages}
          className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:border file:border-gray-300 file:text-xs file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-50 file:cursor-pointer"
        />
        {errors.images && <p className="mt-1 text-xs text-red-500">{errors.images}</p>}

        {(data.images || []).length > 0 && (
          <ul className="mt-3 space-y-1">
            {data.images.map((file, i) => (
              <li key={i} className="flex items-center justify-between text-xs text-gray-700 bg-gray-50 px-3 py-1.5">
                <span className="truncate max-w-xs">{file.name}</span>
                <button type="button" onClick={() => removeImage(i)}
                  className="ml-3 text-gray-400 hover:text-red-500 transition-colors font-bold">
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}
