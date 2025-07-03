import {
  Modal,
  Radio,
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  message
} from "antd";
import { useState, useEffect } from "react";
import { getCaptcha, addUser, userIsExist } from "../../api/user";
import { LoginInfo, RegisterInfo } from "../../types/user";
import { login } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

import styles from "../../styles/login/LoginForm.module.css";

type LoginFormProps = {
  isShow: boolean;
  closeModal: () => void;
};

export default function LoginForm({ isShow, closeModal }: LoginFormProps) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [loginForm] = Form.useForm<LoginInfo>();
  const [registerForm] = Form.useForm<RegisterInfo>();

  const [messageApi, contextHolder] = message.useMessage();
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

  const [captcha, setCaptcha] = useState<any>(null);


  useEffect(() => {
    captchaClickHandle();
  },[isShow])

  useEffect(() => {
    captchaClickHandle()
  }, [value])

  const loginHandle = (values: LoginInfo) => {
    console.log(values);
  };

  const registerHandle = (values: RegisterInfo) => {
    addUser(values).then((res) => {
        console.log(res, 'res',messageApi);
        if(res.code === 0){
            messageApi.success('用户注册成功，默认密码为 123456');
            dispatch(login(res.data));
            closeModal()
        }else{
            messageApi.error(res.msg);
            captchaClickHandle();
        }
        
    }).catch((err) => {
        messageApi.error('注册失败');
        console.log(err);
    });
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
      setCaptcha(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleReset = (type: string) => {
    if (type === 'login') {
      loginForm.resetFields();
    } else {
      registerForm.resetFields();
    }
  };

  const handleCancel = () => {
    closeModal();
    setValue(1);
    loginForm.resetFields();
    registerForm.resetFields();
  };

  const checkLoginIdIsExist = (rule: any, value: string, callback: any) => {
        userIsExist(value).then((res: any) => {
      if(res.data){
        callback('用户已存在');
      }else{
        callback();
      }
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
          form={loginForm}
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
            <Button type="primary" htmlType="submit" onClick={() => handleReset('login')}>
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
          form={registerForm}
          onFinish={registerHandle}
          labelCol={{ span: 5 }}
          labelAlign="left"
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
              { validator: checkLoginIdIsExist },
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
            name="captcha"
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
            <Button type="primary" htmlType="submit" onClick={() => handleReset('register')}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  return (
    <div>
        {contextHolder}
        <Modal title="注册/登录" open={isShow} onCancel={handleCancel}>
            <Radio.Group 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                block 
                optionType="button"
                buttonStyle="solid"
                style={{marginBottom: 20}}
            >
                <Radio value={1}>登录</Radio>
                <Radio value={2}>注册</Radio>
            </Radio.Group>
            {container}
        </Modal>
    </div>
  );
}
