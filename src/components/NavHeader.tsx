import React from "react";
import { NavLink } from "react-router-dom";
import { Input, Space, Select, Button } from "antd";
import LoginAvatar from './Login/login-avatar';

type NavHeaderProps = {
  loginHandler: () => void;
}

export default function NavHeader(props: NavHeaderProps) {
  return (
    <div className="headerContainer">
      {/* 头部logo */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>

      {/* 头部导航 */}
      <div className="navContainer">
        <NavLink to="/" className="navgation">
          首页
        </NavLink>
        <NavLink to="/books" className="navgation">
          书籍
        </NavLink>
        <NavLink to="/interviews" className="navgation">
          面试题
        </NavLink>
        <a
          href="https://www.baidu.com"
          target="_blank"
          rel="noreferrer"
          className="navgation"
        >
          博客
        </a>
      </div>

      {/* 搜索框 */}
      <div className="searchContainer">
        <Space.Compact>
          <Select defaultValue="issue" size="large" style={{ width: "25%" }}>
            <Select.Option value="issue">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input.Search
            placeholder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{
              width: "75%",
            }}
          />
        </Space.Compact>
      </div>

      {/* 登录按钮 */}
      <div className="loginBtnContainer">
        <LoginAvatar loginHandler={props.loginHandler} />
      </div>
    </div>
  );
}
