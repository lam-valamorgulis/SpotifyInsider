import Wrapper from '../assets/wrappers/ChartItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTopSongs, getRecommendSongs } from '../features/topSongs/topSongsSlice';
import { TopSongs, RecommendSongs } from '../components';
import React, { useMemo } from 'react';
import debounce from 'lodash.debounce';

const ChartItem = ({ title, icon, color, bcg }) => {
  const { topSongs, recommendSongs } = useSelector((store) => store.topSongs);
  const dispatch = useDispatch();

  // Debounce Function: Using the debounce function is a good idea to prevent rapid multiple clicks triggering multiple API calls. However, since you're using the handleClick function inside a component, it's better to memoize it using the useMemo hook. This will ensure that the debounce function is not recreated on each render, which would cause debounce to not work as expected.
  
  const handleClick = useMemo(() => debounce((event) => {
    const clickElement = event.target;
    if (clickElement.closest('article').className.includes('30') && topSongs.length === 0) {
      dispatch(getTopSongs());
    } else if (clickElement.closest('article').className.includes('Recommend') && recommendSongs.length === 0) {
      dispatch(getRecommendSongs());
    }
  }, 1000), [dispatch, topSongs, recommendSongs]);

  return (
    <Wrapper className={title} color={color} bcg={bcg} onClick={handleClick}>
      <header>
        <span className='title'> {title}</span>
        <span className='icon'>{icon}</span>
      </header>
      {title.includes("30") ? <TopSongs topSongs={topSongs} /> : null}
      {title.includes("Recommend") ? <RecommendSongs recommendSongs={recommendSongs} /> : null}
    </Wrapper>
  )
}
export default ChartItem;
