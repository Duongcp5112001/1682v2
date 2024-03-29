import React, { useEffect } from 'react'
import { Form, message } from 'antd';
// import { updateComment } from '~/api/ideas';
import { TextArea } from '~/components/atoms/Input';
import Modal from '~/components/atoms/Modal'
import { SUCCESS } from '~/utils/constant';
import { editPostComment } from '~/api/post';

interface Props {
  comment: any;
  postId?: string;
  visible: boolean,
  setVisivle: (value: boolean) => void;
  refetch: () => void;
}

const ModalEditComment = (props: Props) => {
  const {visible, setVisivle, refetch, comment, postId} = props;
  const [form] = Form.useForm();
  const rules = [{ required: true, message: '' }];
  useEffect(() => {
    if (comment && postId) {
      form.setFieldValue('content', comment.content)
    }
  }, [comment, postId])
  
  const handleEnter = () => {
    if (form && comment) {
      form.submit()
    }
  }

  const handleEditComment = async (formValues: any) => {
    let res: any = null;
    if (postId) {
      res = await editPostComment(postId, comment?._id, formValues)
    }
    if (res.msg === SUCCESS) {
      message.success('Update comment success')
      refetch();
      setVisivle(false);
      form.resetFields();
    } else {
      message.error(res.msg)
    }
  }
  return (
    <Modal
      open={visible}
      onCancel={() => setVisivle(false)}
      centered
      maskClosable
      footer={false}
    >
      <div>
        <h3 className='text-xl mb-2 font-semibold'>Edit comment</h3>
        <Form
          form={form}
          autoComplete='off'
          onFinish={handleEditComment}
        >
          <Form.Item
            rules={rules}
            name='content'
          >
            <TextArea
              onPressEnter={handleEnter}
              placeholder={`What's in your mind?`}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalEditComment