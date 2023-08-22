import { useState } from 'react';
import { useSelector } from 'react-redux';
import { theme,Layout, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom'
import {SiderBar,HeaderContainer} from '../components'

const { Header, Sider, Content } = Layout;

const SharedLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const {token} = useSelector((store) => store.topSongs); 
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  
  return (
    <Layout>
      <SiderBar collapsed={collapsed}/>        
      <Layout>
        <HeaderContainer 
          colorBgContainer={colorBgContainer} 
          collapsed={collapsed}
          handleCollapsed={handleCollapsed}
          />
        <Content>
          <Outlet/>
        </Content>
      </Layout>    
    </Layout>        
  );
};
export default SharedLayout;