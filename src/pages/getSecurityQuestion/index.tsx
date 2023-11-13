import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { Form, Input, message } from 'antd';
import TailwindButton from '~/components/atoms/TailwindButton';
import { getQuestion } from '~/api/resetPassword';
import { SUCCESS } from '~/utils/constant';
import Spin from '~/components/atoms/Spin';
import { useAppDispatch } from '~/store';
import { setUserSecurityQuestion } from '~/store/userInfo';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/routes';

const GetSecurityQuestion = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGetSecurityQuestion = async (formValues: any) => {
    setLoading(true)
    try {
      if (formValues) {
        const fmData = {
          username: formValues.userName
        }
        const res = await getQuestion(fmData)
        if (res) {
          if (res.msg === SUCCESS) {
            dispatch(setUserSecurityQuestion(res.data))
            setTimeout(() => {
              navigate(ROUTES.AnswerQuestion)
              setLoading(false)
            }, 1500);
          } else {
            message.error(res.msg)
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
              onFinish={handleGetSecurityQuestion}
            >
              <Form.Item 
                name='userName'
                label='User Name'
                rules={[
                  { required: true, message: 'Please input user name!' },
                ]}
              >
                <Input className={styles.formInput}/>
              </Form.Item>
              <Form.Item>
              <TailwindButton
                loading={loading}
                customClass='bg-violet-400 text-white px-2 py-1 w-[380px] hover:bg-violet-300 hover:text-black'
                htmlType="submit"
              >
                Get security question
              </TailwindButton>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

    </Spin>
  )
}

export default GetSecurityQuestion