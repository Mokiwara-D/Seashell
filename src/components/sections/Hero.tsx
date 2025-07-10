import placeholder from '@/assets/placeholder.jpg'
import { Content, Wrapper } from '@/components/ui/container'

function Hero() {
  return (
    <Wrapper
      className="hero-background h-64 bg-black/40 bg-cover bg-center bg-blend-multiply sm:h-80 md:h-104"
      style={{
        backgroundImage: `url(${placeholder})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Content className="justify-center md:justify-start">
        <div className="flex w-fit max-w-full items-center justify-center overflow-hidden rounded-lg bg-white p-3 sm:p-4 md:px-8 md:py-6 lg:px-10 lg:py-8">
          <h1 className="text-accent text-center text-xl font-bold whitespace-nowrap sm:text-2xl md:text-3xl lg:text-4xl">
            SPAIN HOLIDAYS
          </h1>
        </div>
      </Content>
    </Wrapper>
  )
}

export { Hero }
