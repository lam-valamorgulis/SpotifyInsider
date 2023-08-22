import { Navigate , Link, Outlet, redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isObjectEmpty } from '../utils/consts.jsx';
import React, { useEffect,useState } from 'react'

const ProtectedRoute = ({ children }) => {
  const { access } = useSelector((store) => store.user);
  console.log(access)
  // const [protect,setProtect] = useState(access)

  // useEffect(() => {
  //   setProtect(!access)
  // },[access])
  
  if (!access) {
    return <Navigate to="/landing"/>;
  } 
  return children  
  
  
  // if (protect) {
  //   return <Navigate to="/landing"/>;
  // } else {
  //   return children  
  // }
};
export default ProtectedRoute;
