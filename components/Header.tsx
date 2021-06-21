import Image from 'next/image'

function HeaderComponent() {
  return (
    <div className="py-6 flex items-center text-sm leading-5 border-b border-white border-opacity-20">
      <div className="flex justify-start items-center">
        <p className="text-xl leading-8 font-bold text-[#D8B4FE]">Pomegradient</p>
        <div className="ml-2 flex justify-center items-center text-xs text-white font-semibold w-28 h-6 bg-white bg-opacity-30 rounded-md uppercase">
          coming soon!
        </div>
      </div>
    </div>
  )
}

export { HeaderComponent }
