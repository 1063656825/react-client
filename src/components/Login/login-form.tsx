import React from "react";
import {
  Modal,
  Radio,
  Form,
  Input,
  Button,
  FormInstance,
  Row,
  Col,
  Checkbox,
} from "antd";
import { useState, useRef, useEffect } from "react";
import { getCaptcha } from "../../api/user";
import { LoginInfo, RegisterInfo } from "../../types/user";

import styles from "../../styles/login/LoginForm.module.css";

type LoginFormProps = {
  isShow: boolean;
  closeModal: () => void;
};

export default function LoginForm({ isShow, closeModal }: LoginFormProps) {
  const [value, setValue] = useState(1);
  const loginFormRef = useRef<FormInstance>(null);
  const registerFormRef = useRef<FormInstance>(null);

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });

  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    loginId: "",
    nickname: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState<string>("");


  useEffect(() => {
    captchaClickHandle();
  },[isShow])
  const handleLogin = () => {};

  const loginHandle = (values: LoginInfo) => {
    console.log(values);
  };

  const registerHandle = (values: RegisterInfo) => {
    console.log(values);
  };

  const updateInfo = <T extends Record<string, any>>(
    info: T, 
    value: any, 
    key: keyof T, 
    setInfo: (info: T) => void
  ) => {
    const newInfo = { ...info };
    newInfo[key] = value;
    setInfo(newInfo);
  };

  const captchaClickHandle = () => {
    getCaptcha().then((res) => {
      setCaptcha(res.data.captcha);
    });
  };

  let container = null;
  if (value === 1) {
    // 登录面板的 JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
          labelCol={{ span: 5 }}
          labelAlign="left"

        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
              }
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)
              }
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      "captcha",
                      setLoginInfo
                    )
                  }
                />
              </Col>
              <Col span={5}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  "remember",
                  setLoginInfo
                )
              }
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    // 注册面板的 JSX
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              // { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "loginId",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item label="用户昵称" name="nickname">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "nickname",
                  setRegisterInfo
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      "captcha",
                      setRegisterInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  return (
    <div>
        <Modal title="注册/登陆" open={isShow} onCancel={closeModal}>
            <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
                <Radio value={1}>登录</Radio>
                <Radio value={2}>注册</Radio>
            </Radio.Group>
            {container}
        </Modal>
    </div>
  );
}
