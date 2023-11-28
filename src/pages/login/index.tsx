import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '~/routes';
import { setLogin } from '~/api/login';
import { handleLogin } from '~/utils/helper';
import { getCookie } from '~/utils/cookie';
import { LOGIN_SUCCESS } from '~/utils/constant';
import styles from './styles.module.scss';
import ModalRegister from '~/components/molecules/ModalRegister';
import { useAppDispatch } from '~/store';
import { setUserInfo } from '~/store/userInfo';
import Spin from '~/components/atoms/Spin';
import TailwindButton from '~/components/atoms/TailwindButton';


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
      console.log(error)
      // message.error(error)
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
    <Spin spinning={loading}>
      <div className={styles.login}>
        <div className={styles.card}>
          <div className={styles.left}>
              <h1></h1>
              <p>
              </p>
              <span>Don't you have an account?</span>
              <button 
                className='bg-btnSecondary px-2 py-1 w-20 rounded-md hover:bg-slate-500'
                onClick={() => setVisibleModalRegister(true)}
              >
                Register
              </button>
          </div>
          <div className={styles.right}>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <Form
              form={form}
              layout='vertical'
              onFinish={handleGetCookie}
            >
              <Form.Item 
                name='userName'
<<<<<<< Updated upstream
                label='User Name'
=======
                label='Username'
>>>>>>> Stashed changes
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
              <TailwindButton
                loading={loading}
                customClass='bg-violet-400 text-white px-2 py-1 w-[380px] hover:bg-violet-300 hover:text-black'
                htmlType="submit"
              >
                Login
              </TailwindButton>
              </Form.Item>
            </Form>
            <Link to={ROUTES.GetSecurityQuestion} style={{ textDecoration: "none", color:"grey" }}>
                Don't remember your password?
            </Link>
          </div>
        </div>
      </div>
    </Spin>
      <ModalRegister
        visible={visibleModalRegister}
        setVisible={setVisibleModalRegister}
      />
    </>
  )
}

export default Login