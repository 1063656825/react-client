/**
 * 登录头像, 登录后显示头像, 未登录显示登录按钮
 */
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Avatar, Button, List, Popover, Image, message } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';

import styles from '../../styles/login/LoginAvatar.module.css';
import { logout } from '../../redux/userSlice';

type LoginAvatarProps = {
  loginHandler: () => void;
}

export default function LoginAvatar(props: LoginAvatarProps) {
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const handleClick = (item: string) => {
        if(item === '个人中心'){
            props.loginHandler();
        }else{
            dispatch(logout());
            localStorage.removeItem('userToken');
            messageApi.success('退出登录成功');
        }
    }
  const { isLogin, userInfo } = useSelector((state: RootState) => state.user);
  let loginStatus = null;
  if (isLogin) {
    const content = (
        <List dataSource={['个人中心','退出登录']} size='large' renderItem={(item) => {
            return (
                <List.Item style={{cursor: "pointer"}} onClick={() => handleClick(item)}>{item}</List.Item>
            )
        }}/>
    )
    loginStatus = (
        <Popover content={content} trigger="click">
            <div className={styles.avatarContainer}>
                <Avatar src={<Image src={userInfo?.avatar} preview={false}/>} size="large" icon={<UserOutlined />} />
            </div>
        </Popover>
    )
  }else{
    loginStatus = (
        <Button type="primary" size="large" onClick={props.loginHandler}>注册/登录</Button>
    )
  }
  return (
    <div>
        {contextHolder}
        {loginStatus}
    </div>
  )
}
