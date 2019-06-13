
import React, { useState } from 'react';
import { BrowserRouter as Router,
         Route,
         Link,
} from 'react-router-dom';
// import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon } from 'antd';

import UserListPage from './pages/UserListPage/UserListPage';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';
import UserEditPage from './pages/UserEditPage/UserEditPage';
import UserCreatePage from './pages/UserCreatePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import HomePage from './pages/Home';
import { UserProvider } from './providers/UserProvider';

const { Sider } = Layout;

const App = () => {
  const [currentTab, setCurrent] = useState(localStorage.getItem('currentTab') || '1');
  const handleClick = ({ key }) => {
    setCurrent(key);
    localStorage.setItem('currentTab', key);
  }
  
  return (
    <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
          >
            <div className="logo" />
            <Menu 
              theme="dark" 
              mode="inline" 
              onClick={handleClick}
              selectedKeys={[currentTab]}
            >
              <Menu.Item key="1">
                <Link to='/'>
                  <Icon type="home" />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to='/users'>
                  <Icon type="user" />
                  Users
                </Link>
              </Menu.Item>
            </Menu>
            <LogoutPage/>
          </Sider>
          <Layout>
            <Route path='/' exact component={HomePage} />
            <Route path='/users' exact component={UserListPage} />
            <Route path='/users/:id/details' exact component={UserDetailsPage} />
            <UserProvider>
              <Route path='/users/create' exact component={UserCreatePage} />
              <Route path='/users/edit/:id' exact component={UserEditPage} />
              <Route path='/login' exact component={LoginPage} />
            </UserProvider>
          </Layout>
        </Layout>
    </Router>    
  );
};

export default App;