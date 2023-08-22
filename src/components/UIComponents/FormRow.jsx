import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { featureUpdate } from '../../features/topSongs/topSongsSlice.jsx';
  

const FormRow = ({name, handleChange}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(0);
  const onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setInputValue(value);
    dispatch(featureUpdate({name,value}))
  };

  const max = 100
  const step = 10

  if (name == 'popularity') {
    
  }

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
         {name}
       </label>

      {name == 'popularity' ? 
        <Slider
          min={0}
          max={100}
          step={10}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        /> : <Slider
          min={0}
          max={1}
          step={0.01}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      }
    </div>
  );
};
export default FormRow;
