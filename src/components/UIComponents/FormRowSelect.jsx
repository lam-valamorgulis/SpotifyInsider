import React from 'react';
import { Select } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { featureUpdate } from '../../features/topSongs/topSongsSlice.jsx';


const FormRowSelect = ({name}) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(featureUpdate({name,value}))
    console.log(`selected ${value}`);
  };
  
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {name}
      </label>
      <Select
      defaultValue="acoustic"
      style={{
        width: '100%',
      }}
      onChange={handleChange}
      options={[
        {
          value: 'acoustic',
          label: 'acoustic',
        },
        {
          value: 'blues',
          label: 'blues',
        },
        {
          value: 'dance',
          label: 'dance',
        },
        {
          value: 'edm',
          label: 'edm',
        },
        {
          value: 'trance',
          label: 'trance',
        },
        {
          value: 'romance',
          label: 'romance',
        },
        {
          value: 'rainy-day',
          label: 'rainy-day',
        },
      ]}
    />
    </div>
  );
};
export default FormRowSelect;
