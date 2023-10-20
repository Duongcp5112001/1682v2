import React from 'react';
import { Modal as ModalLib } from 'antd';
import type { ModalProps } from 'antd';

type Props = ModalProps & {
  children?: React.ReactNode | React.ReactNode[];
};

function Modal(props: Props) {

  return (
    <ModalLib closable {...props}>
      {props?.children}
    </ModalLib>
  );
}

export default Modal;
