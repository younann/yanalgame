import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/** Giant back pill (➜ points right = "back" in RTL). Esc does the same on desktop. */
export default function BackButton({
  to,
  label,
  icon,
  className = '',
}: {
  to: string
  label: string
  icon?: string
  className?: string
}) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate(to)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, to])

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className={`compact-btn flex cursor-pointer items-center justify-center gap-3 rounded-[2rem] bg-back px-5 text-2xl font-extrabold whitespace-nowrap text-back-ink shadow-clay outline-none transition-transform duration-150 hover:bg-back-dark focus-visible:ring-4 focus-visible:ring-back-ink/40 active:scale-95 ${className}`}
    >
      <span aria-hidden className="text-3xl">
        ➜
      </span>
      {label}
      {icon && (
        <span aria-hidden className="text-3xl">
          {icon}
        </span>
      )}
    </button>
  )
}
