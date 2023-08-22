import Wrapper from '../assets/wrappers/SongsContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Song } from '../components'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react'
import { Spin } from 'antd';
import { Skeleton } from 'antd';


const SongsContainer = () => {
  const { isLoading,searchSongsFilter } = useSelector((store) => store.topSongs);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState([]);
  
  const fetchMoreData = () => {
    setIndex(prevIndex => prevIndex + 20);
    setTimeout(() => {
      const newItems = searchSongsFilter.slice(index, index + 20)
      setItems([...items, ...newItems]);
    }, 1000);
  }

  useEffect(() => {
    setItems(searchSongsFilter.slice(index, index + 20))
  }, [searchSongsFilter]);

  console.log(searchSongsFilter)
  console.log(items)
  // if (isLoading) {
  //   return <Loading />;
  // }

  if (searchSongsFilter.length === 0) {
    return (
      <Wrapper>
        <h4>Filter songs to display...</h4>
      </Wrapper>
    );
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < 100} 
        loader={
          <div className="example">
            <Spin/>
          </div>
        }
      >
        {items.map((items) => {
          return <Song key={items.id} {...items} />;
        })}
      </InfiniteScroll>
    </div>
  );
};
export default SongsContainer;


