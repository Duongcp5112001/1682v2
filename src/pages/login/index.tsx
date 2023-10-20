import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '~/routes';
import { setLogin } from '~/api/login';
import { setGuestLogin } from '~/api/login';
import { handleLogin } from '~/utils/helper';
import { getCookie } from '~/utils/cookie';
import { LOGIN_SUCCESS } from '~/utils/constant';
import loadable from '~/utils/loadable';
import Svg from '~/components/atoms/Svg';
import styles from './styles.module.scss';
import ModalRegister from '~/components/molecules/ModalRegister';
import { useAppDispatch } from '~/store';
import { setUserInfo } from '~/store/userInfo';

const Spin = loadable(() => import('~/components/atoms/Spin'));

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visibleModalRegister, setVisibleModalRegister] = useState(false);
  const [searchParams] = useSearchParams();
  const [guestInfo, setGuestInfo] = useState('')

  const navigate = useNavigate();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const dispatch = useAppDispatch();

  const handleGetCookie = async (formValues: any) => {
    setLoading(true)
    try {
      if (form) {
        const fmData = {
          username: formValues.userName,
          password: formValues.password
        }
        const res = await setLogin(fmData)
        if (res) {
          if (res.msg === LOGIN_SUCCESS) {
            const token = res?.access_token;
            const userId = res?.member?._id
            handleLogin({
              accessToken: token,
              userId: userId,
              userRole: res.member.role,
            })
            dispatch(setUserInfo(res.member));
            setLoading(false)
          } else {
            message.error(res.msg)
            setLoading(false)
          }
        }
      }
    } catch (error: any) {
      message.error(error)
    }
  }

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      navigate(callbackUrl);
      return;
    } 
  }, [navigate, callbackUrl]);
  
  return (
    <>
      <div className={styles.login}>
        <div className={styles.card}>
          <div className={styles.left}>
              <h1></h1>
              <p>
              </p>
              <span>Don't you have an account?</span>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
          </div>
          <div className={styles.right}>
            <h1>Login</h1>
            <Form
              form={form}
              layout='vertical'
              onFinish={handleGetCookie}
            >
              <Form.Item 
                name='userName'
                label='Email'
                rules={[
                  { required: true, message: 'Please input user name!' },
                ]}
              >
                <Input className={styles.formInput}/>
              </Form.Item>
              <Form.Item 
                name='password'
                label='Password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password className={styles.formInput}/>
              </Form.Item>
              <Form.Item>
              <Button 
                className={styles.btnLogin}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
              </Form.Item>
            </Form>
            <Link to={ROUTES.ResetPassword} style={{ textDecoration: "none" , color:"grey" }}>
                <p>Don't remember your password?</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login