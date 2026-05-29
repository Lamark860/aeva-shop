import { revalidatePath } from 'next/cache'

// Безопасная ревалидация ISR-кэша. В контексте Next-запроса (мутация из админки)
// сбрасывает кэш указанных путей; вне его (seed / payload CLI) — тихо пропускает,
// чтобы скрипты не падали с "revalidatePath outside of a render".
type Target = string | [path: string, type: 'page' | 'layout']

export function safeRevalidate(...targets: Target[]): void {
  for (const t of targets) {
    try {
      if (Array.isArray(t)) revalidatePath(t[0], t[1])
      else revalidatePath(t)
    } catch {
      /* вне request-scope — игнорируем */
    }
  }
}
