import React from 'react';
import Modal from '../Modal';
import { Button, Form, message } from 'antd';
import { createGroup } from '~/api/groups';
import { SUCCESS } from '~/utils/constant';
import Input from '../Input';
import TailwindButton from '../TailwindButton';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  refetch: () => void;
}

const ModalCreateGroup = (props: Props) => {
  const {visible, setVisible, refetch} = props;
  const [form] = Form.useForm();
  const rules = [{ required: true, message: '' }];

  const handleCreateGroup = async (formValues: any) => {
    try {
      const fmData = {
        name: formValues.name,
        description: formValues.description
      }
      const res = await createGroup(fmData)
      if (res) {
        if (res.msg === 'Create group Success!') {
          message.success('Create group success')
          setVisible(false)
          refetch()
        } else {
          message.error('Create group fail!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseModal = () => {
    form.resetFields()
    setVisible(false)
  }


  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      centered
      closable={false}
      maskClosable
      footer={false}
    >
      <div>
        <h3 className='text-xl mb-5 font-semibold text-center'>Create your group</h3>
        <Form
          form={form}
          layout='vertical'
          autoComplete='off'
          onFinish={handleCreateGroup}
        >
          <Form.Item
            rules={rules}
            label='Group name'
            name='name'
          >
            <Input/>
          </Form.Item>
          <Form.Item
            rules={rules}
            label='Group description'
            name='description'
          >
            <Input/>
          </Form.Item>
          <div className='flex justify-end'>
            <Button
              onClick={handleCloseModal}
            >
              Cancel
            </Button>

            <TailwindButton
              htmlType='submit'
              type='primary'
              customClass='ml-2'
            >
              Create
            </TailwindButton>                
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalCreateGroup