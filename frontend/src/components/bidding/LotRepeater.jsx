import React from 'react'

export default function LotRepeater({ items, onChange }) {
  const updateItem = (index, key, value) => {
    const next = items.map((it, i) => (i === index ? { ...it, [key]: value } : it))
    onChange(next)
  }

  const add = () => onChange([...items, { lot_number: '', max_bid: '' }])
  const remove = (index) => onChange(items.filter((_, i) => i !== index))

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-3 items-center">
          <input className="col-span-5 rounded-md border px-3 py-2" placeholder="Lot number" value={item.lot_number} onChange={(e) => updateItem(idx, 'lot_number', e.target.value)} />
          <input className="col-span-5 rounded-md border px-3 py-2" placeholder="Max bid" value={item.max_bid} onChange={(e) => updateItem(idx, 'max_bid', e.target.value)} />
          <button type="button" onClick={() => remove(idx)} className="col-span-2 rounded-md bg-rose-500 px-3 py-2 text-white">Remove</button>
        </div>
      ))}
      <button type="button" onClick={add} className="rounded-md bg-slate-900 px-4 py-2 text-white">Add Lot</button>
    </div>
  )
}
