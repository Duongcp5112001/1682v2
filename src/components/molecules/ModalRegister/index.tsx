import React, { useMemo } from 'react';
import Modal from '~/components/atoms/Modal';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { setRegister } from '~/api/register';
import { Gender, REGISTER_SUCCESS, SUCCESS } from '~/utils/constant';
import styles from './styles.module.scss';
import TailwindButton from '~/components/atoms/TailwindButton';

interface Props{
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ModalRegister = (props: Props) => {
  const {visible, setVisible} = props;
  const [form] = Form.useForm();

  const rules = [{ required: true, message: '' }];

  const handleRegister = async (formValues: any) => {
    try {
      if (form) {
        const fmData = {
          username: formValues.userName,
          reenterPassword: formValues.confirmPassword,
          password: formValues.password
        }
        const res = await setRegister(fmData)
        if (res) {
          if (res.msg === REGISTER_SUCCESS) {
            message.success('Register account success')
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
              className='w-[65px]'
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