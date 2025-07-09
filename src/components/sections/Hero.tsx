import placeholder from '@/assets/placeholder.jpg'
import { Content, Wrapper } from '@/components/ui/container'

function Hero() {
  return (
    <Wrapper
      className="h-96 bg-black/40 bg-cover bg-center bg-blend-multiply"
      style={{ backgroundImage: `url(${placeholder})` }}
    >
      <Content>
        <div className="flex h-28 w-1/2 items-center justify-center rounded-lg bg-white p-4">
          <h1 className="text-accent text-4xl font-bold">SPAIN HOLIDAYS</h1>
        </div>
      </Content>
    </Wrapper>
  )
}

export { Hero }
