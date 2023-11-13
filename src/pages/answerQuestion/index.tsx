import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { Form, Input, message } from 'antd';
import TailwindButton from '~/components/atoms/TailwindButton';
import { getQuestion } from '~/api/resetPassword';
import { SUCCESS } from '~/utils/constant';
import Spin from '~/components/atoms/Spin';
import { RootState, useAppDispatch, useAppSelector } from '~/store';
import { setUserSecurityQuestion } from '~/store/userInfo';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/routes';

const AnswerQuestion = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const userSecurityQuestion = useAppSelector(
    (state: RootState) => state.userSecurityQuestion.userSecurityQuestion
  );
  const navigate = useNavigate();
  
  const handleCheckAnswer = (formValues: any) => {
    if (formValues && userSecurityQuestion) {
      if (formValues.answer === userSecurityQuestion[0]?.secretAnswer) {
        setLoading(true)
        setTimeout(() => {
          navigate(ROUTES.ResetPassword)
          setLoading(false)
        }, 1500);

      } else {
        message.error('Wrong answer!')
      }
    }
  }

  useEffect(() => {
    if (userSecurityQuestion && form) {
      form.setFieldsValue({
        question: userSecurityQuestion[0]?.secretQuestion
      })
    }
  }, [userSecurityQuestion])
  

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
              onFinish={handleCheckAnswer}
            >
              <Form.Item 
                name='question'
                label='Question'
              >
                <Input className={styles.formInput} disabled/>
              </Form.Item>
              <Form.Item 
                name='answer'
                label='Answer'
              >
                <Input className={styles.formInput}/>
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

export default AnswerQuestion