import { Container } from '@/components/ui/container'

function Destinations() {
  return (
    <Container
      wrapperClassName="py-8 md:py-12 bg-secondary"
      contentClassName="flex flex-col gap-12"
    >
      <h2 className="text-foreground text-center text-2xl font-bold md:text-3xl">
        Destinations
      </h2>
    </Container>
  )
}

export { Destinations }
