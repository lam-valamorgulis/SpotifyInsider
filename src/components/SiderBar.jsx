import { Layout, Menu } from 'antd';
import { Logo } from '../components';
import { ITEMS } from '../utils/consts.jsx'
import { useNavigate } from 'react-router-dom'


const { Sider } = Layout;

const SiderBar = ({collapsed}) => {
  const navigate = useNavigate();
  
  return (
    <div class="sider-wrapper">
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed} width='200'>
        <div className="demo-logo-vertical">
          { !collapsed ? <Logo fade='loadFadeOut'/> : <Logo fade='loadFadeIn'/> }
        </div>  
        <Menu
          style={{'border-right-width': '0px'}}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={ITEMS}
          onClick = {(key) => navigate(key.key)}
        />
      </Sider>
    </div>
  )
}
export default SiderBar