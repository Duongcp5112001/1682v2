import React, { useMemo, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { setRegister } from '~/api/register';
import { REGISTER_SUCCESS } from '~/utils/constant';

import loadable from '~/utils/loadable';
import styles from './styles.module.scss';
import { useQuestions } from '~/hooks/securityQuestion';
import Select, {Option} from '~/components/atoms/Select';

const TailwindButton = loadable(() => import("~/components/atoms/TailwindButton"));
const Modal = loadable(() => import("~/components/atoms/Modal"));
interface Props{
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ModalRegister = (props: Props) => {
  const {visible, setVisible} = props;
  const [form] = Form.useForm();
  const [isSelectQuestion, setIsSelectQuestion] = useState(false) 
  const rules = [{ required: true, message: '' }];

  const {data: questions, isLoading, isFetching} = useQuestions(true)

  const questionOptions = useMemo(() => questions?.data?.map((item: any) => ({
    label: item.question,
    value: item._id,
  })), [questions]);

  const handleRegister = async (formValues: any) => {
    try {
      if (form) {
        const fmData = {
          username: formValues.userName,
          reenterPassword: formValues.confirmPassword,
          password: formValues.password,
          secretQuestion: formValues.secretQuestion,
          secretAnswer: formValues.secretAnswer
        }
        const res = await setRegister(fmData)
        if (res) {
          if (res.msg === REGISTER_SUCCESS) {
            message.success('Register account success')
            form.resetFields()
            setVisible(false)
          }
          else {
            message.error(res.msg)
          }
        }
      }
    } catch (error: any) {
      message.error(error)
    }
  }

  const handleCloseRegisterModal = () => {
    form.resetFields()
    setVisible(false)
  }

  const handleSelectQuestion = () => {
    setIsSelectQuestion(true)
  }

  return (
    <Modal
      open={visible}
      width={420}
      footer={false}
      maskClosable={true}
      closable={false}
      centered
    >
      <div className={styles.formContainer}>
      <h1>Register</h1>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleRegister}
        >
          <Form.Item 
            className={styles.firstItem}
            name='userName'
            label='User Name'
            rules={rules}
          >
            <Input
              placeholder='Enter user name'
            />
          </Form.Item>

          <Form.Item 
            name='password'
            label='Password'
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
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item 
            name='confirmPassword'
            label='Confirm password'
            rules={[
              { required: true, message: 'Please input your confirm password!' },
              {
                validator: async (_, value) => {
                  const password = form.getFieldValue('password')
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
              placeholder='Confirm password'
            />
          </Form.Item>

          <Form.Item 
            className={styles.firstItem}
            name='secretQuestion'
            label='Security question'
            rules={rules}
          >
            <Select 
              loading={isLoading || isFetching}
              onChange={handleSelectQuestion}
            >
              {questionOptions && questionOptions.map((item: any) =>
                <Option key={item.value} value={item.label}>{item.label}</Option>
              )}
            </Select>
          </Form.Item>
          { isSelectQuestion ?
            <Form.Item
              name='secretAnswer'
              label='Your answer'
              rules={rules}
            >
              <Input/>
            </Form.Item>
            :null
          }

          <div className={styles.btnGroup}>
            <Button
              className={styles.btnClose}
              onClick={handleCloseRegisterModal}
            >
              Close
            </Button>

            <TailwindButton
              htmlType='submit'
              type='primary'
            >
              Save
            </TailwindButton>                
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalRegister