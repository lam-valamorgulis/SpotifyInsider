import styled from 'styled-components';
import { FormRow,FormRowSelect } from '../components';
import { useSelector,useDispatch } from 'react-redux';
import { getFilterSongs } from '../features/topSongs/topSongsSlice.jsx';


const RecommendContainer = () => {
  
  const dispatch = useDispatch();  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFilterSongs())
  };
  
  return (
    <Wrapper>
      <form className='form'>
        <h3>Recommend Songs</h3>
        <div className='form-center'>
          {/* target acousticness */}
          <FormRow
            name='acousticness'
          />
          {/* company */}
          <FormRow
            name='danceability'
          />
          {/* jobLocation */}
          <FormRow
            name='energy'
          />
          {/* status */}
          <FormRow
            name='instrumentalness'
          />
          {/* job type*/}
          <FormRow
            name='liveness'
          />
          <FormRow
            name='popularity'
          />
          <FormRow
            name='loudness'
          />
          <FormRowSelect
            name='genres'
          />
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 3rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default RecommendContainer