import { GradientCard } from './GradientCard'
function GradientCardList({ gradients }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {gradients.map((item) => (
        <div key={item.key}>
          <GradientCard item={item} />
        </div>
      ))}
    </ul>
  )
}

export { GradientCardList }