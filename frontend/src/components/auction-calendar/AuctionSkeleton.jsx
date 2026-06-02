import React from 'react'

export default function AuctionSkeleton() {
  return (
    <div className="border border-gray-200 bg-white flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="h-52 bg-gray-200 w-full flex-shrink-0" />

      {/* Text placeholders */}
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-3/5" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}
