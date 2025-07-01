import './styles/App.css';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import { Layout } from 'antd';
import RouterConfig from './router';
import LoginForm from './components/Login/login-form';
import { useState } from 'react';

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loginHandler = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
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
