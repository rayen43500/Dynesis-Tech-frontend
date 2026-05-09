'use client'

interface StatProps {
  value: number
  label: string
  suffix?: string
}

/**
 * Affiche la valeur réelle au SSR / premier paint (SEO, prévisualisations Netlify).
 * L’ancien compteur partait de 0 → crawlers et HTML statique montraient « 0+ ».
 */
export function StatCounter({ value, label, suffix = '' }: StatProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 text-center duration-700">
      <p className="text-2xl font-bold text-white tabular-nums sm:text-3xl lg:text-4xl">
        {value}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-medium text-white/70 sm:text-sm">{label}</p>
    </div>
  )
}
