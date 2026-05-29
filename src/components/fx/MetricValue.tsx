'use client'
import React from 'react'
import CountUp from './CountUp'

// Парсит строку из Globals («12+», «50–500», «8–14», «Шамот») и анимирует
// последнее число через CountUp. Если числа нет — отдаёт строку как есть.
// Алина пишет в админке любое значение, анимация подбирается автоматически.
export default function MetricValue({ value }: { value: string }) {
  const m = value.match(/^(.*?)(\d+)(\D*)$/)
  if (!m) return <>{value}</>
  const [, prefix, num, suffix] = m
  return (
    <>
      {prefix}
      <CountUp value={Number(num)} />
      {suffix}
    </>
  )
}
