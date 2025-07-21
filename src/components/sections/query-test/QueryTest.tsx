import { Container } from '../../ui/container'
import { QueryData } from './QueryData'

const QueryTest = () => {
  return (
    <Container
      wrapperClassName="py-12"
      contentClassName="flex flex-col items-start gap-6"
    >
      <QueryData />
    </Container>
  )
}

export { QueryTest }
