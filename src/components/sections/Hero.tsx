import { placeholder } from '@/lib/imagePreloader'
import { Content, Wrapper } from '@/components/ui/container'
import { useDestination } from '@/contexts/useDestination'

function Hero() {
  const { destination } = useDestination()

  return (
    <Wrapper
      className="hero-background h-64 bg-black/40 bg-cover bg-center bg-no-repeat bg-blend-multiply sm:h-80 md:h-96"
      style={{ backgroundImage: `url(${placeholder})` }}
    >
      <Content className="justify-center md:justify-start">
        <div className="bg-background flex max-w-2/3 items-center justify-center overflow-hidden rounded-lg p-3 sm:p-4 md:px-8 md:py-6 lg:px-10 lg:py-8">
          <h1 className="text-accent text-center text-xl font-bold sm:text-2xl md:text-left md:text-3xl lg:text-4xl">
            {destination.name.toUpperCase()} HOLIDAYS
          </h1>
        </div>
      </Content>
    </Wrapper>
  )
}

export { Hero }
