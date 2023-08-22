import React, { useEffect } from 'react';
import styled from 'styled-components';
import ColumnCharts from './charts/ColumnCharts';
import { DropdownFilter } from '../components'
import { useSelector, useDispatch } from 'react-redux';
import { getArtists,timeFilter } from '../features/user/userSlice';
import { getFeatures } from '../features/topSongs/topSongsSlice';
import debounce from 'lodash.debounce';


const Analytic = () => {
  const { topSongsName: songsName, featureAudio } = useSelector((store) => store.topSongs);
  const { topArtists,timeRange } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const options = [
    { label: '6 months', value: 'medium_term' },
    { label: 'All times', value: 'long_term' },
  ];

  const debouncedHandleOptionSelect = debounce((selectedValue) => {
  console.log('Selected:', selectedValue);
  // Perform filtering logic based on the selected option
  dispatch(timeFilter(selectedValue));
}, 300); // Adjust the debounce delay as needed (in milliseconds)


  useEffect(() => {
    dispatch(getArtists());
    dispatch(getFeatures());
  }, [dispatch,timeRange]);

  return (
    <Wrapper>
      <DropdownFilterWrapper>
        <DropdownFilter options={options} onSelect={(selectedValue) => debouncedHandleOptionSelect(selectedValue)}  />
      </DropdownFilterWrapper>
      <ColumnChartsWrapper>
        <ColumnCharts songsName={songsName} topArtists={topArtists} featureAudio={featureAudio}/>
      </ColumnChartsWrapper>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  position: relative;
`;

const ColumnChartsWrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 3fr;
  }

  div,
  .fusioncharts-container,
  svg {
    width: 100%;
    height: 100%;
  }

  svg {
    border-radius: var(--radius) !important;
  }
`;

const DropdownFilterWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 20px;
  z-index: 99;
`;


export default Analytic;
