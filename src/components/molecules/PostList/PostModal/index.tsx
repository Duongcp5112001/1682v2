import { Avatar, Button, Form, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { TextArea } from '~/components/atoms/Input'
import { InboxOutlined } from '@ant-design/icons';
import { useAppSelector } from '~/store'
import { setPost, updatePost } from '~/api/post'
import { CREATE_POST_SUCCESS, KEY_MESSAGE, SUCCESS } from '~/utils/constant'
import { Option } from '~/components/atoms/Select';
import { ref, getDownloadURL, uploadBytesResumable, getMetadata } from "firebase/storage";
import { RcFile, UploadFile } from 'antd/es/upload';

import storage from '~/utils/firebase';
import Meta from 'antd/es/card/Meta'
import Select from '~/components/atoms/Select'
import loadable from '~/utils/loadable'
import styles from './styles.module.scss'
import { createPost } from '~/api/groups';

const TailwindButton = loadable(() => import("~/components/atoms/TailwindButton"));
const Modal = loadable(() => import("~/components/atoms/Modal"));

interface Props {
  postData?: any;
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  afterSuccess?: () => void;
  groupId?: any;
}

const ModalPost = (props: Props) => {
  const { Dragger } = Upload;
  const {visible, setVisible, afterSuccess, postData, groupId} = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const rules = [{ required: true, message: '' }];
  const [form] = Form.useForm();
  
  const [metadataList, setMetadataList] = useState<any>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<any>();
  const uploadFileToFirebase = async (file: any, onSuccess: any, onError: any, onProgress: any) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress({ percent: progress.toFixed(2) });
      },
      (error) => {
        onError(error);
      },
      async () => {
        const snapshot = await uploadTask;
        const metadata = await getMetadata(storageRef);
        const result = {
          name: metadata.name,
          url: await getDownloadURL(snapshot.ref)
        };
        setMetadataList((prevState: any) =>{
          if (postData && postData.image?.length > 0) {
            return [...postData.image, result]
          }
          return [...prevState, result]});
        onSuccess(result);
      }
    );
  };

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      const {document, ...rest} = formValues;
      const fmData = {
        ...rest,
        image: metadataList,
        isAnonymous: false
      }
      if (groupId) {
        if (postData) {
          res = await updatePost(postData._id, fmData)
        } else {
          res = await createPost(groupId,fmData)
        }
        if (res.msg === CREATE_POST_SUCCESS) {
          message.success({
            content: postData ? 'Update post success' : 'Add post success'
          })
          if (afterSuccess) {
            afterSuccess()
          }
          form.resetFields();
          setVisible(false)
        } else if (res.error) {
          message.error(res.error)
        }
      } else {
        if (postData) {
          res = await updatePost(postData._id, fmData)
        } else {
          res = await setPost(fmData)
        }
        if (res.msg === CREATE_POST_SUCCESS || res.msg === SUCCESS) {
          message.success({
            content: postData ? 'Update post success' : 'Add post success'
          })
          if (afterSuccess) {
            afterSuccess()
          }
          form.resetFields();
          setVisible(false)
        } else {
          message.error(res.error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (value: any) => {
    if (value === 'Anonymous') {
      setIsAnonymous(true);
    } else {
      setIsAnonymous(false);
    }
  }

  const handleClose = () => {
    setVisible(false);
    if (!postData) {
      form.resetFields()
    }
  }

  const afterClose = () => {
    setFileList([]);
  }

  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);
  useEffect(() => {
    if (postData) {
      form.setFieldsValue({
        description: postData.description,
        isAnonymous: false
      })
      setFileList(postData?.image)
      setMetadataList(postData.image)
    }
  }, [postData])
  
  return (
    <Modal
      width={560}
      centered
      open={visible}
      footer={false}
      forceRender
      afterClose={afterClose}
      closable={false}
      onCancel={handleClose}
      maskClosable
      className={styles.modalContainer}
    >
    <div className='text-center'>
      <h3 className='text-xl font-semibold'>
        {postData ? 
          'Edit your post'
          :
          'Create your post'
        }
      </h3>
    </div>
    <Meta
      className={styles.metaUser}
      avatar={<Avatar size={54} src={userData?.avatar}/>}
      title={
        <div className={styles.titleGroup}>
          <strong>{userData?.username}</strong>
          {/* <Select
            defaultValue={'Public'}
            size='small'
            onChange={handleChange}
          >
            <Option key={'1'} value={'Public'}>Public</Option>
            <Option key={'2'} value={'Anonymous'}>Anonymous</Option>
          </Select> */}
        </div>
        
      }
    />
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      autoComplete="off"
      className={styles.formContainer}
    >
      <Form.Item 
        name='description'
        rules={rules}
      >
        <TextArea
          maxLength={300}
          placeholder={`What's on your mind?`}
        />
      </Form.Item>
      <div className={styles.uploadBtn}>
        <Dragger
          multiple={true}
          customRequest={({ file, onSuccess, onError, onProgress }) => uploadFileToFirebase(file, onSuccess, onError, onProgress)}
          listType="picture-card"
          onPreview={handlePreview}
          fileList={fileList}
          onChange={(info) => {
            const { status } = info.file;
            // if (status !== "uploading") {
            //   console.log(info.fileList);
            // }
            if (status === "done") {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            } else if (status === "removed") {
              const result = info.fileList?.map((item: any) => (
                {
                  name: item.name,
                  url: item.url
                }
              ))
              setMetadataList(result);
            }
            // Save file list in state
            const fileList = [...info.fileList];
            setFileList(fileList);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to image</p>
        </Dragger>
      </div>
      <div className={styles.btnGroup}>
        <TailwindButton
          type='primary'
          htmlType='submit'
          customClass='w-100'
        >
          { postData ? 
            'Update'
            : 
            'Post'
          }
        </TailwindButton>                
      </div>
    </Form>
    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
      <img alt="preview" style={{ width: '100%' }} src={previewImage} />
    </Modal>
    </Modal>
  )
}

export default ModalPost