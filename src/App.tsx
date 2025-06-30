import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <NavHeader />
        </Header>
        <Content>
        </Content>
        <Footer>
          <PageFooter />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
