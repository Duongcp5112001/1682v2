import React from 'react';
import { Input as InputLib, InputProps } from 'antd';


type Props = InputProps & {
  prefix?: string,
  addonBefore?: React.ReactNode,
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>,
  maxLength?: number;
  ref?: any,
  type?: string,
}

function Input(props: Props) {
  return (
    <InputLib {...props} />
  );
}

export const { TextArea } = InputLib;

export default Input;
