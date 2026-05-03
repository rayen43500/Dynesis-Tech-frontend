'use client'

import { useEffect, useState } from 'react'

interface StatProps {
  value: number
  label: string
  suffix?: string
}

export function StatCounter({ value, label, suffix = '' }: StatProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="text-center">
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
        {count}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-white/70 mt-2 font-medium">{label}</p>
    </div>
  )
}
