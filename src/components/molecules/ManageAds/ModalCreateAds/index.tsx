import { Form, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Input from '~/components/atoms/Input'
import { InboxOutlined } from '@ant-design/icons';
import { useAppSelector } from '~/store'

import { SUCCESS } from '~/utils/constant'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { RcFile, UploadFile } from 'antd/es/upload';
import { createAds, updateAds } from '~/api/admin';

import storage from '~/utils/firebase';
import loadable from '~/utils/loadable'
import styles from './styles.module.scss'

const TailwindButton = loadable(() => import("~/components/atoms/TailwindButton"));
const Modal = loadable(() => import("~/components/atoms/Modal"));

interface Props {
  adData?: any;
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  afterSuccess?: () => void;
  setEditAds: React.Dispatch<any>;
}

const ModalAds = (props: Props) => {
  const { Dragger } = Upload;
  const {visible, setVisible, afterSuccess, adData, setEditAds} = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const rules = [{ required: true, message: '' }];
  const [form] = Form.useForm();
  
  const [metadataList, setMetadataList] = useState<any>('');
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
        const url =  await getDownloadURL(snapshot.ref)

        setMetadataList(url);
        onSuccess(url);
      }
    );
  };

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      const {document, ...rest} = formValues;
      const fmData = {
        ...rest,
        img: metadataList,
      }
      if (adData && adData?._id) {
        res = await updateAds(adData._id, fmData)
      } else {
        res = await createAds(fmData)
      }
      if (res.msg === 'Create ads successfully!' || res.msg === SUCCESS) {
        message.success({
          content: adData ? 'Update ads successfully!' : 'Create ads successfully!'
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
    setVisible(false);
    setEditAds({});
    if (!adData?._id) {
      form.resetFields()
    }
  }

  const handleResetField = () => {
    if (!adData?._id && !visible) {
      form.resetFields()
      setFileList([])
    }
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
    if (adData && adData?._id) {
      form.setFieldsValue({
        title: adData.title,
        company: adData.company,
        url: adData.url,
      })
      setFileList(adData?.img ? [{url: adData?.img}] : [])
      setMetadataList(adData?.img)
    }
  }, [adData])
  
  return (
    <Modal
      width={560}
      centered
      open={visible}
      footer={false}
      forceRender
      closable={false}
      onCancel={handleClose}
      afterClose={handleResetField}
      maskClosable
      className={styles.modalContainer}
    >
    <div className='text-center'>
      <h3 className='text-xl font-semibold'>
        {(adData?._id) ?
          'Edit Ad'
          :
          'Create Ad'
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
      <div className={styles.uploadBtn}>
        <Dragger
          multiple={true}
          customRequest={({ file, onSuccess, onError, onProgress }) => uploadFileToFirebase(file, onSuccess, onError, onProgress)}
          listType="picture-card"
          onPreview={handlePreview}
          fileList={fileList}
          onChange={(info) => {
            const { status } = info.file;
            if (status === "done") {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            } else if (status === "removed") {
                setMetadataList('');
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
          { adData?._id ? 
            'Update'
            : 
            'Create'
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

export default ModalAds