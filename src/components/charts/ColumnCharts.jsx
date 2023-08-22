import React from 'react';
import ReactFusioncharts from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';

// Load FusionCharts
charts(FusionCharts);

const ColumnCharts = 
  ({ songsName, 
    topArtists,
    featureAudio 
   }) => {


    
  
  const dataSource = {
  chart: {
    showToolTip: '0',
    type: 'mscolumn3d',
    caption: 'Top Songs Features Insight',
    xaxisname: 'Feature',
    formatnumberscale: '1',
    theme: 'gammel',
    drawcrossline: '1',
  },
  categories: [
    {
      category: songsName.map((item) => ({ label: item })),
    },
  ],
  dataset: ['energy', 'acousticness', 'danceability'].map((seriesname) => ({
    seriesname,
    data: featureAudio.map((item) => ({ value: item[seriesname] })),
  })),
};
      
  const combinedArray = topArtists.flatMap((obj) => obj.genres);
  const transformedArray = combinedArray.reduce((acc, genre) => {
    const existingGenre = acc.find((item) => item.label === genre);
    if (existingGenre) {
      existingGenre.value += 1;
    } else {
      acc.push({ label: genre, value: 1 });
    }
    return acc;
  }, []);

  const dataSource1 = {
    chart: {
      showToolTip: '0',
      caption: 'Most genres',
      xaxisname: 'Genres',
      decimals: '1',
      theme: 'gammel',
    },
    data: transformedArray,
  };

  return (
    <>
      <ReactFusioncharts
        type='column3d'
        width='100%'
        height='350'
        dataFormat='JSON'
        dataSource={dataSource1}
      />
      <ReactFusioncharts
        type='mscolumn3d'
        width='100%'
        height='350'
        dataFormat='JSON'
        dataSource={dataSource}
      />
    </>
  );
};

export default ColumnCharts;
