import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFollowedArtists } from '../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';

const Followers = () => {
  const dispatch = useDispatch();

  const { followedArtist } = useSelector((store) => store.user);
  
  useEffect(() => {
    dispatch(getFollowedArtists())
  },[]);
  
  console.log(followedArtist)
  return (
    <Wrapper>
      <div className='followers'>
        {followedArtist.map((artist) => {
          return (
            <article key={artist.id}>
              <img src={artist.images[1].url} alt={artist.name} />
              <div>
                <h5>{artist.name}</h5>
                <a href={artist.external_urls.spotify}>{artist.external_urls.spotify}</a>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: white;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  margin-top: 2rem;
  margin-bottom: 2rem;

  &::before {
    content: ' followers';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background-color: white;
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 90%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Followers;
