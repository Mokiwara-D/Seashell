import { Container } from '../../ui/container'
import { QueryData } from './QueryData'

const QueryTest = () => {
  return (
    <Container wrapperClassName="p-12" contentClassName="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">OFFERS</h2>
      <QueryData />
    </Container>
  )
}

export { QueryTest }
