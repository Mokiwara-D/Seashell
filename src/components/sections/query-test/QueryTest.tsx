import { Container } from '../../ui/container'
import { QueryData } from './QueryData'

const QueryTest = () => {
  return (
    <Container contentClassName="flex flex-col gap-4 py-12">
      <h2 className="text-2xl font-bold">OFFERS</h2>
      <QueryData />
    </Container>
  )
}

export { QueryTest }
