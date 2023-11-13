import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { Form, Input, message } from 'antd';
import TailwindButton from '~/components/atoms/TailwindButton';
import { SUCCESS } from '~/utils/constant';
import Spin from '~/components/atoms/Spin';
import { RootState, useAppSelector } from '~/store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/routes';
import { resetPassword } from '~/api/resetPassword';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const userData = useAppSelector(
    (state: RootState) => state.userSecurityQuestion.userSecurityQuestion
  );
  const handleResetPassword = async (formValues: any) => {
    setLoading(true)
    try {
      if (formValues && userData) {
        const fmData = {
          newPassword: formValues.newPassword
        }
        const res = await resetPassword(userData[0]?._id, fmData)
        if (res) {
          if (res.msg === SUCCESS) {
            message.success('Reset password success')

            setTimeout(() => {
              navigate(ROUTES.Login)
              setLoading(false)
            }, 2000);
          } else {
            message.error(res.msg)
            setLoading(false)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Spin spinning={loading}>
     <div className={styles.login}>
        <div className={styles.card}>
          <div className={styles.left}>

          </div>
          <div className={styles.right}>
            <h1 className='text-3xl font-bold text-center'>Reset Password</h1>
            <Form
              form={form}
              layout='vertical'
              onFinish={handleResetPassword}
            >
              <Form.Item 
                name='newPassword'
                label='New password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    validator: async (_, value) => {
                      if (value) {
                        if (value.length < 8) {
                          return Promise.reject(new Error('Password need atleast 8 characters'))
                        }
                      }
                    }
                  }
                ]}
              >
                <Input.Password
                  className={styles.formInput}
                />
              </Form.Item>

              <Form.Item 
                name='confirmPassword'
                label='Confirm password'
                rules={[
                  { required: true, message: 'Please input your confirm password!' },
                  {
                    validator: async (_, value) => {
                      const password = form.getFieldValue('newPassword')
                      if (value) {
                        if (value !== password) {
                          return Promise.reject(new Error('Confirm password cannot match!'))
                        }
                      }
                    }
                  }
                ]}
              >
                <Input.Password
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item>
              <TailwindButton
                loading={loading}
                customClass='bg-violet-400 text-white px-2 py-1 w-[380px] hover:bg-violet-300 hover:text-black'
                htmlType="submit"
              >
                Reset Password
              </TailwindButton>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

    </Spin>
  )
}

export default ResetPassword