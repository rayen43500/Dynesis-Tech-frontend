export function TrustedBy() {
  const companies = [
    { name: 'TechCorp', emoji: '🚀' },
    { name: 'CloudBase', emoji: '☁️' },
    { name: 'DataFlow', emoji: '📊' },
    { name: 'InnovateLab', emoji: '🔬' },
  ]

  return (
    <div className="border-t border-white/20 pt-8 mt-8">
      <p className="text-xs sm:text-sm text-white/60 text-center font-medium mb-6">
        TRUSTED BY LEADING COMPANIES
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {companies.map((company) => (
          <div key={company.name} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <span className="text-xl sm:text-2xl">{company.emoji}</span>
            <span className="text-xs sm:text-sm font-medium">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
