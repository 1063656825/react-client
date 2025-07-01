/**
 * 登录头像, 登录后显示头像, 未登录显示登录按钮
 */
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Avatar, Button, List, Popover } from 'antd';
import { UserOutlined } from "@ant-design/icons";

import styles from '../../styles/login/LoginAvatar.module.css';

type LoginAvatarProps = {
  loginHandler: () => void;
}

export default function LoginAvatar(props: LoginAvatarProps) {
  const { isLogin } = useSelector((state: RootState) => state.user);
  let loginStatus = null;
  if (isLogin) {
    const content = (
        <List dataSource={['个人中心','退出登录']} size='large' renderItem={(item) => {
            return (
                <List.Item style={{cursor: "pointer"}}>{item}</List.Item>
            )
        }}/>
    )
    loginStatus = (
        <Popover content={content} trigger="click">
            <div className={styles.avatarContainer}>
                <Avatar src="" size="large" icon={<UserOutlined />} />
            </div>
        </Popover>
    )
  }else{
    loginStatus = (
        <Button type="primary" size="small" onClick={props.loginHandler}>登录</Button>
    )
  }
  return (
    <div>
        {loginStatus}
    </div>
  )
}
