import { Avatar, Layout, Col, Row, Button, Typography } from 'antd';
import { Logo } from '../components';
import { ITEMS } from '../utils/consts.jsx'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { isObjectEmpty } from '../utils/consts'
import { getUser } from '../features/user/userSlice';



const { Header } = Layout;
const HeaderContainer = ({ colorBgContainer, collapsed, handleCollapsed }) => {
  const changeCollapsed = () => {
    handleCollapsed(!collapsed);
  };
  const dispatch = useDispatch();
  const {isLoading,
         user,
         isGetUser,
        } = useSelector((store) => store.user);

  useEffect(() => {
    if (isObjectEmpty(user)) {
      dispatch(getUser());
    }
    }, [isGetUser]);

  console.log(user)
  
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
        background: colorBgContainer,
      }}
    >
      <Row align='middle' style={{ height: '100%' }} justify='space-between'>
        <Col span={6}>
            <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={changeCollapsed}
            style={{
              fontSize: '24px',
              width: 64,
              height: 64,
            }}
          />
        </Col>
        <Row span={6}>
          <Link to='/landing'>
          <h3 className='logo-text'>Spotify Insider</h3>
        </Link>
        </Row>
        
        <Col 
          style={{ 
            textAlign: 'right',
            paddingRight: '3rem'}}
          span={6}>
          <Col className='avatar-user'>
             <Avatar
              size={{
                xs: 48,
                sm: 48,
                md: 48,
                lg: 48,
                xl: 48,
                xxl:48,
              }}
            src= { !isObjectEmpty(user) && user.images[1].url ? user.images[1].url : null}
          />
          </Col>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderContainer;
