import './styles/App.css';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import { Layout, message } from 'antd';
import RouterConfig from './router';
import LoginForm from './components/Login/login-form';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo, getUserById } from './api/user';
import { login } from './redux/userSlice';
const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getInfo();
      if(res.data){
        const {data} = await getUserById(res.data._id);
        dispatch(login(data));
      }else{
        messageApi.error(res.msg);
        localStorage.removeItem('userToken');
      }
    }
    if(localStorage.userToken){
      getUserInfo();
    }
  }, [dispatch, messageApi]);
  
  const loginHandler = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      {contextHolder}
      <Layout>
        <Header className="header">
          <NavHeader loginHandler={loginHandler} />
        </Header>
        <Content className="content">
          <RouterConfig />
        </Content>
        <Footer className="footer">
          <PageFooter />
        </Footer>
      </Layout>
      <LoginForm isShow={isModalOpen} closeModal={closeModal}/>
    </div>
  );
}

export default App;
