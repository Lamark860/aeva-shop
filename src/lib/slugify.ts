// Транслитерация кириллицы + нормализация в URL-slug.
// Нужна, чтобы из русских названий («Ваза „Тишина“») получались
// человекочитаемые латинские slug'и (vaza-tishina) автоматически.
const MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

export function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .split('')
    .map((ch) => (ch in MAP ? MAP[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-') // всё, кроме латиницы/цифр → дефис
    .replace(/^-+|-+$/g, '') // обрезать дефисы по краям
    .slice(0, 80)
}

import type { Field } from 'payload'

// Скрытое slug-поле с авто-генерацией из исходного поля (name/title).
// beforeValidate (а не beforeChange) — чтобы сгенерированное значение успевало
// пройти проверку required/unique. Можно переопределить вручную при необходимости.
export function slugField(source = 'name'): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: { hidden: true, description: 'Адрес страницы. Генерируется из названия автоматически.' },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const base = (value && String(value).trim()) || data?.[source]
          return slugify(String(base ?? '')) || value
        },
      ],
    },
  }
}
