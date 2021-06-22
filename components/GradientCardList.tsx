import { GradientCard } from './GradientCard'

function GradientCardList({ gradients }) {
  if (!gradients) {
    return null
  }

  return (
    <ul className="grid grid-cols-2 gap-10 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {gradients.map((item) => (
        <div key={item.id}>
          <GradientCard item={item} />
        </div>
      ))}
    </ul>
  )
}

export { GradientCardList }
