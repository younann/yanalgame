import { useEffect, useRef, useState } from 'react'
import { useKidLock } from './kidLockContext'

const HOLD_MS = 2000
const PIN_LENGTH = 4
const MAX_ATTEMPTS = 5
const COOLDOWN_SECONDS = 30

/**
 * Small, faint lock in the corner. Opens the parent panel only after a
 * 2-second press — toddlers tap, they rarely hold.
 */
export function ParentGate() {
  const { locked } = useKidLock()
  const [open, setOpen] = useState(false)
  const [holding, setHolding] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const start = () => {
    setHolding(true)
    timer.current = window.setTimeout(() => {
      setHolding(false)
      setOpen(true)
    }, HOLD_MS)
  }
  const cancel = () => {
    setHolding(false)
    window.clearTimeout(timer.current)
  }

  return (
    <>
      <button
        type="button"
        aria-label="للأهل"
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onContextMenu={(e) => e.preventDefault()}
        className="fixed bottom-[max(0.25rem,env(safe-area-inset-bottom))] left-[max(0.25rem,env(safe-area-inset-left))] z-40 flex size-11 touch-none items-center justify-center rounded-full text-lg opacity-35 select-none"
      >
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full ${holding ? 'hold-ring' : ''}`}
          style={{ ['--hold-ms' as string]: `${HOLD_MS}ms` }}
        />
        {locked ? '🔒' : '🔓'}
      </button>
      {open && <ParentPanel onClose={() => setOpen(false)} />}
    </>
  )
}

type Step = 'enter' | 'create' | 'confirm' | 'menu' | 'change' | 'changeConfirm'

function ParentPanel({ onClose }: { onClose: () => void }) {
  const { locked, hasPin, setPin, checkPin, lock, unlock } = useKidLock()
  const [step, setStep] = useState<Step>(() => (!hasPin ? 'create' : locked ? 'enter' : 'menu'))
  const [draft, setDraft] = useState('')
  const [firstPin, setFirstPin] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)

  // Count down the lock-out after too many wrong PINs.
  const coolingDown = secondsLeft > 0
  useEffect(() => {
    if (!coolingDown) return
    const id = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [coolingDown])

  const submit = async (pin: string) => {
    setDraft('')
    if (step === 'enter') {
      if (await checkPin(pin)) {
        setError('')
        setAttempts(0)
        setStep('menu')
      } else {
        const next = attempts + 1
        setAttempts(next)
        if (next >= MAX_ATTEMPTS) {
          setSecondsLeft(COOLDOWN_SECONDS)
          setAttempts(0)
        }
        setError('الرمز غلط، جربوا كمان مرة')
      }
    } else if (step === 'create' || step === 'change') {
      setFirstPin(pin)
      setError('')
      setStep(step === 'create' ? 'confirm' : 'changeConfirm')
    } else if (step === 'confirm' || step === 'changeConfirm') {
      if (pin !== firstPin) {
        setError('الرمزين مش زي بعض، ابدأوا من جديد')
        setStep(step === 'confirm' ? 'create' : 'change')
        return
      }
      await setPin(pin)
      if (step === 'confirm') {
        lock()
        onClose()
      } else {
        setError('')
        setStep('menu')
      }
    }
  }

  const press = (digit: string) => {
    if (secondsLeft > 0) return
    const next = (draft + digit).slice(0, PIN_LENGTH)
    setDraft(next)
    if (next.length === PIN_LENGTH) void submit(next)
  }

  const titles: Record<Exclude<Step, 'menu'>, string> = {
    enter: 'رمز الأهل',
    create: 'اختاروا رمز للأهل (٤ أرقام)',
    confirm: 'أعيدوا الرمز للتأكيد',
    change: 'الرمز الجديد (٤ أرقام)',
    changeConfirm: 'أعيدوا الرمز الجديد',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-cream/97 px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur"
    >
      <div className="mx-auto flex max-w-sm flex-col items-center gap-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-extrabold text-back-ink">👨‍👩‍👧 للأهل</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="سكّر"
            className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-back text-2xl text-back-ink active:scale-95"
          >
            ✕
          </button>
        </div>

        {step === 'menu' ? (
          <ParentMenu
            locked={locked}
            onLock={() => {
              lock()
              onClose()
            }}
            onUnlock={() => {
              unlock()
              onClose()
            }}
            onChangePin={() => setStep('change')}
          />
        ) : (
          <>
            <p className="text-center text-xl font-bold">{titles[step]}</p>
            {step === 'create' && (
              <p className="text-center text-sm leading-relaxed text-[#6b5a52]">
                بعد ما تعملوا الرمز، بيتقفل التطبيق: الطفل ما بيقدر يطلع منه بدون الرمز. لفتحه: اضغطوا مطوّلًا على
                القفل 🔒 بالزاوية.
              </p>
            )}
            <div dir="ltr" className="flex gap-4" aria-label="PIN">
              {Array.from({ length: PIN_LENGTH }, (_, i) => (
                <span
                  key={i}
                  className={`size-5 rounded-full border-2 border-back-ink ${i < draft.length ? 'bg-back-ink' : ''}`}
                />
              ))}
            </div>
            <p className="min-h-6 text-center font-bold text-red-700">
              {secondsLeft > 0 ? `استنوا ${secondsLeft} ثانية` : error}
            </p>
            <div dir="ltr" className="grid grid-cols-3 gap-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                <PadKey key={d} onClick={() => press(d)}>
                  {d}
                </PadKey>
              ))}
              <span />
              <PadKey onClick={() => press('0')}>0</PadKey>
              <PadKey onClick={() => setDraft((v) => v.slice(0, -1))} label="امسح">
                ⌫
              </PadKey>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PadKey({ children, onClick, label }: { children: string; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-20 cursor-pointer items-center justify-center rounded-full bg-white text-3xl font-bold shadow-clay transition-transform duration-100 active:scale-90"
    >
      {children}
    </button>
  )
}

function ParentMenu({
  locked,
  onLock,
  onUnlock,
  onChangePin,
}: {
  locked: boolean
  onLock: () => void
  onUnlock: () => void
  onChangePin: () => void
}) {
  const btn =
    'flex min-h-16 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-xl font-extrabold shadow-clay transition-transform duration-150 active:scale-95'
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-center text-lg font-bold">
        {locked ? 'قفل الأطفال شغّال 🔒' : 'قفل الأطفال طافي 🔓'}
      </p>
      {locked ? (
        <button type="button" onClick={onUnlock} className={`${btn} bg-back text-back-ink`}>
          🔓 طفّي قفل الأطفال
        </button>
      ) : (
        <button type="button" onClick={onLock} className={`${btn} bg-play text-white`}>
          🔒 شغّل قفل الأطفال
        </button>
      )}
      <button type="button" onClick={onChangePin} className={`${btn} bg-white text-back-ink`}>
        🔢 غيّر الرمز
      </button>

      <section className="rounded-3xl border-4 border-cream-border bg-white p-4 text-sm leading-relaxed text-[#4b3a32]">
        <p className="mb-2 font-bold text-play">مهم: قفل زر الهوم 🏠</p>
        <p className="mb-3">
          القفل بالتطبيق بيمنع الطفل يطلع على يوتيوب أو يسكّر التطبيق بزر الرجوع. بس زر/حركة الهوم ما بيقدر يمنعها
          غير الجهاز نفسه:
        </p>
        <p className="mb-1 font-bold">آيفون / آيباد — Guided Access:</p>
        <p className="mb-3">
          الإعدادات ← تسهيلات الاستخدام ← الوصول الموجّه (Guided Access) ← شغّلوه واعملوا رمز. افتحوا التطبيق واضغطوا
          زر الجنب ٣ مرات ← ابدأ. للخروج: ٣ ضغطات كمان والرمز.
        </p>
        <p className="mb-1 font-bold">أندرويد — تثبيت الشاشة:</p>
        <p>
          الإعدادات ← الأمان ← تثبيت التطبيقات (App pinning) ← شغّلوه. افتحوا التطبيقات الأخيرة، اضغطوا على أيقونة
          التطبيق ← تثبيت.
        </p>
      </section>
      <p className="text-center text-xs text-[#8a7a72]">نسيتوا الرمز؟ احذفوا التطبيق وثبتوه من جديد.</p>
    </div>
  )
}
