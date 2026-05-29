'use client'
import React, { useState } from 'react'

// Кнопка для админа: пересобирает все публичные страницы сайта (ISR-инвалидация).
// На контейнер не влияет — Next пересобирает страницы в фоне при следующем заходе.
// Алина может нажать, если не уверена что её правки видны на сайте.
export default function RevalidateButton() {
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle')
  const [msg, setMsg] = useState<string>('')

  async function run() {
    setState('busy'); setMsg('')
    try {
      const res = await fetch('/api/revalidate-all', { method: 'POST', credentials: 'include' })
      const json = await res.json()
      if (!res.ok || !json?.ok) {
        setState('err'); setMsg(json?.error || `Ошибка ${res.status}`)
        return
      }
      setState('ok'); setMsg(`Обновлено страниц: ${json.count}`)
      setTimeout(() => { setState('idle'); setMsg('') }, 4000)
    } catch (e: any) {
      setState('err'); setMsg(e?.message || 'Сетевая ошибка')
    }
  }

  const label =
    state === 'busy' ? 'Обновляю…' :
    state === 'ok' ? '✓ Готово' :
    state === 'err' ? 'Ошибка — повторить' :
    'Обновить сайт'

  const bg =
    state === 'ok' ? '#3a7a4a' :
    state === 'err' ? '#c0392b' :
    'transparent'

  const color = state === 'ok' || state === 'err' ? '#fff' : 'var(--cer-text)'
  const border = state === 'ok' || state === 'err' ? 'transparent' : '1px solid var(--cer-border)'

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <button
        type="button"
        onClick={run}
        disabled={state === 'busy'}
        title="Применить все правки контента к сайту. Контейнер не перезапускается, посетители ничего не заметят."
        style={{
          padding: '10px 18px', background: bg, color, border, cursor: state === 'busy' ? 'wait' : 'pointer',
          fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}
      >
        {label}
      </button>
      {msg && state !== 'busy' && (
        <span style={{ fontSize: 12, color: 'var(--cer-text-muted)' }}>{msg}</span>
      )}
    </div>
  )
}
