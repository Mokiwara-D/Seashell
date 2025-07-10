import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

function SignUp() {
  return (
    <Container
      wrapperClassName="py-4 bg-accent"
      contentClassName="flex flex-col items-center justify-between sm:flex-row gap-2"
    >
      <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <h1 className="text-center text-xl font-bold lg:text-left">
          <span className="sm:hidden">EXCLUSIVE OFFERS</span>
          <span className="hidden sm:block md:hidden">
            EXCLUSIVE OFFERS AND MORE
          </span>
          <span className="hidden md:block">
            GET EXCLUSIVE OFFERS AND MUCH MORE
          </span>
        </h1>
        <p className="mb-2 grow text-left text-sm lg:mb-0 lg:ml-6">
          Sign up to our emails today...
        </p>
      </div>
      <Button
        size="lg"
        className="bg-foreground rounded-full text-xs font-bold text-white"
      >
        SIGN UP
      </Button>
    </Container>
  )
}

export { SignUp }
