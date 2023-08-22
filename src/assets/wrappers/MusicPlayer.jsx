import styled from 'styled-components'

const Wrapper = styled.section`
  margin-bottom: 50px;;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr;
    column-gap: 1rem;
  }
`
export default Wrapper
