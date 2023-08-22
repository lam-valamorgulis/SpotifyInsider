import styled from 'styled-components'

const Wrapper = styled.article`
  border-radius: 50px;
  transition: all 0.3s ease;
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  &:hover {
    width: 101%;
    height: 101%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    display: block;
    font-weight: 700;
    font-size: 16px;
    color: ${(props) => props.color};
  }
  .list {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`

export default Wrapper
