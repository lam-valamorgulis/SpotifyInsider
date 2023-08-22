import styled from 'styled-components';
import { MdBusiness, MdLocationOn, MdLink, MdWorkspacePremium } from 'react-icons/md';
import { useSelector,useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { isObjectEmpty } from '../utils/consts'

const Card = () => {
  
  const {user} = useSelector((store) => store.user)
  if (isObjectEmpty(user)) {
    return 
  }

  console.log(user)
  
  return (
     <Wrapper>
      <header>
        <img src={user.images[1].url} />
        <div>
          <h4>{user.display_name}</h4>
          <p>{`Country ${user.country}`}</p>
        </div>
        <MdWorkspacePremium className='type-acc'/>
      </header>
      <a href={user.external_urls.spotify}>{user.external_urls.spotify}</a>
      <div className='links'>
        <p>
          <MdBusiness></MdBusiness> {`Id user: ${user.id}`}
        </p>
        <p>
          <MdLocationOn></MdLocationOn> { 'earth'}
        </p>
        <a href=''>
          <MdLink></MdLink>
          {user.email}
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--clr-grey-10);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  background-color: white;
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    background-color: white;
    content: 'user';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--clr-grey-10);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .type-acc {
    width: 60px;
    height: 60px;
    color: gold;
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
export default Card;
