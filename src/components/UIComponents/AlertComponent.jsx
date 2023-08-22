import React from 'react'
import Marquee from 'react-fast-marquee';
import { Alert } from 'antd';

export default function AlertComponent() {  
  return (
    <div style= {{marginTop: 20}}>
      <Alert
      banner
      type="success"
      message={
        <Marquee pauseOnHover gradient={false}>
          Click to fetch data
        </Marquee>
      }
    />
    </div>
  )
}

