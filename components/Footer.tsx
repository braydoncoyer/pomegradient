import Image from 'next/image'

function FooterComponent() {
  return (
    <footer>
      <div className="max-w-xl mx-auto py-6 overflow-hidden rounded-lg grid grid-cols-6">
        <div>
          <Image
            className="rounded-full"
            src="/avatar.jpg"
            alt="Picture of the creator"
            width={64}
            height={64}
          />
        </div>
        <div className="text-md col-span-5">
          <p>
            <span className="font-bold">I&apos;m Braydon Coyer</span> - a senior full stack
            engineer, DOM artist and TDD enthusiast.
          </p>
          <a href="https://braydoncoyer.dev">Learn more about me</a>
        </div>
      </div>
    </footer>
  )
}

export { FooterComponent }
