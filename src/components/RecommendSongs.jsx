import { Avatar, List, ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
const { Title,Paragraph} = Typography;
import { AlertComponent } from '../components'


  
const RecommendSongs = ({recommendSongs: songs}) =>  {
  
  if (songs.length == 0) {
    return <AlertComponent />
    }  
  
  return (
    <>
      <List
        style = {{'marginLeft': '80px'}}
        itemLayout="horizontal"
        dataSource={songs}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              style = {{'align-items': 'center'}}
              avatar={<Avatar size='large' shape='square' src={item.album.images[0].url} />}
              title={<a href="https://ant.design">{index+1}.{item.name}</a>}
              description={item.artists[0].name}
            />
          </List.Item>
        )}
      />
    </>
  )
}
  
export default RecommendSongs;