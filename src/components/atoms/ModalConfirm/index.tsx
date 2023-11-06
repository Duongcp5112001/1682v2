import React from 'react';
import Modal from '../Modal';
import Svg from '../Svg';
import iconWarning from '~/assets/images/warning.svg';

import styles from './styles.module.scss';
import { Button } from 'antd';

interface Props { 
  visible: boolean;
  centered?: any;
  onCancel: (e: any) => void;
  onOk: () => void;
  title: string;
  children?: any;
}

const ModalConfirm = (props: Props) => {
  const {visible, centered, onCancel, onOk, title} = props;
  return (
   <Modal
      open={visible}
      centered={centered}
      footer={false}
      closable={false}
    >
      <div className={styles.headerConfirm}>
        <Svg className={styles.iconWarning} src={iconWarning} alt="icon warning"/>
        <span className={styles.title}>{title}</span>
      </div>
      {props.children}
      <div className='flex justify-end mt-5'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type='primary' danger className='ml-2' onClick={onOk}>Confirm</Button>
      </div>
    </Modal>
  )
}

export default ModalConfirm