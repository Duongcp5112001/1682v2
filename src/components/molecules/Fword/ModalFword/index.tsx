import { Form, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Input from '~/components/atoms/Input'
import { useAppSelector } from '~/store'

import { SUCCESS } from '~/utils/constant'
import { createAds, updateAds } from '~/api/admin';

import loadable from '~/utils/loadable'
import styles from './styles.module.scss'

const TailwindButton = loadable(() => import("~/components/atoms/TailwindButton"));
const Modal = loadable(() => import("~/components/atoms/Modal"));

interface Props {
  fWords?: any;
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  afterSuccess?: () => void;
  setEditAds: React.Dispatch<any>;
}

const ModalFword = (props: Props) => {
  const {visible, setVisible, afterSuccess, fWords, setEditAds} = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const rules = [{ required: true, message: '' }];
  const [form] = Form.useForm();

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      const fmData = {
        formValues,
      }
      if (fWords && fWords?._id) {
        res = await updateAds(fWords._id, fmData)
      } else {
        res = await createAds(fmData)
      }
      if (res.msg === 'Create forbidden word successfully!' || res.msg === SUCCESS) {
        message.success({
          content: fWords ? 'Update forbidden word successfully!' : 'Create forbidden word successfully!'
        })
        if (afterSuccess) {
          afterSuccess()
        }
        form.resetFields();
        setVisible(false)
      } else {
        message.error(res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {

  }

  useEffect(() => {
    
  }, [fWords])
  
  return (
    <Modal
      width={560}
      centered
      open={visible}
      footer={false}
      forceRender
      closable={false}
      onCancel={handleClose}
      maskClosable
      className={styles.modalContainer}
    >
    <div className='text-center'>
      <h3 className='text-xl font-semibold'>
        {(fWords?._id) ?
          'Edit Forbidden Word'
          :
          'Add Forbidden Word'
        }
      </h3>
    </div>
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      autoComplete="off"
      className={styles.formContainer}
    >
      <Form.Item 
        label='Title'
        name='title'
        rules={rules}
      >
        <Input/>
      </Form.Item>
      <Form.Item 
        label='Company'
        name='company'
        rules={rules}
      >
        <Input/>
      </Form.Item>
      <Form.Item 
        label='URL'
        name='url'
        rules={rules}
      >
        <Input/>
      </Form.Item>
      <div className={styles.btnGroup}>
        <TailwindButton
          type='primary'
          htmlType='submit'
          customClass='w-100'
        >
          { fWords?._id ? 
            'Update'
            : 
            'Add'
          }
        </TailwindButton>                
      </div>
    </Form>
    </Modal>
  )
}

export default ModalFword