import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Followers from './Followers';

const User = () => {

  return (
      <Wrapper>
        <Card></Card>
        <Followers></Followers>
      </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(900px, 1fr));
  }
`;


export default User;
