import type { ReactNode } from 'react'

type SectionHeadingProps = {
  children: ReactNode
  as?: 'h2' | 'h3'
  className?: string
}

export default function SectionHeading({
  children,
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  return (
    <Tag
      className={`text-lg md:text-xl font-semibold text-ink mb-5 flex items-start gap-2.5 leading-snug ${className}`}
    >
      <span className="text-ink shrink-0 select-none" aria-hidden>
        ◆
      </span>
      <span>{children}</span>
    </Tag>
  )
}
