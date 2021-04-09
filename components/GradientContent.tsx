import Link from 'next/link'
import { GradientCard } from './GradientCard'

export default function GradientContent({ gradient }) {
  const createdAt =
    typeof gradient?.createdAt === 'number'
      ? new Date(gradient.createdAt)
      : gradient.createdAt.toDate()

  return (
    <div>
      <GradientCard item={gradient} />
      <span>
        Written by{' '}
        <Link href={`/${gradient.username}`}>
          <a>@{gradient.username}</a>
        </Link>
        on {createdAt.toISOString()}
      </span>
    </div>
  )
}
