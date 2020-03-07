
import Menu from './Menu'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;


const Index= () => {

    return (
      <Header>
        BigTodo
        <Menu />
      </Header>
    );
  }

  export default Index