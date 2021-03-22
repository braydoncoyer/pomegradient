function GradientCard({ item }) {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        <div
          className={`w-32 h-32 flex-shrink-0 mx-auto rounded-full`}
          style={{
            background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`,
          }}
        ></div>
        <h3 className="mt-6 text-gray-900 text-sm font-medium">{item.name}</h3>
        <a
          className="text-gray-500 text-sm cursor-pointer"
          href={`https://github.com/${item.author}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.author}
        </a>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200"></div>
      </div>
    </li>
  )
}

export { GradientCard }
