import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Discovery';
import { AiOutlineBarChart, AiOutlineDotChart } from "react-icons/ai";
import ChartItem from './ChartItem';


const defaultCharts = [
    {
      title: 'Get your top 5 tracks from the last 30 days',
      icon: <AiOutlineBarChart />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Recommend 5 songs based on top 5 tracks',
      icon: <AiOutlineDotChart />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
  ];

const Discovery = () => {
  return (
    <Wrapper>
      {defaultCharts.map((item, index) => {
        return <ChartItem key={index} {...item} />;
      })}
    </Wrapper>
  )
}
export default Discovery;