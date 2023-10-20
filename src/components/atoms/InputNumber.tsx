import React from 'react';
import { InputNumber as InputNumberLib, InputNumberProps } from 'antd';

type Props = InputNumberProps & {
  className?: string;
  addonBefore?: React.ReactNode;
  defaultValue?: number | string;
  maxLength?: number;
  value?: number;
  min?: number,
  ref?: any,
  max?: number,
  prefix?: string,
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>,
  onBlur?: React.FocusEventHandler<HTMLInputElement>,
  placeholder?: string,
  type?: string,
}

function InputNumber(props: Props) {
  return (
    <InputNumberLib {...props} />
  );
}

export default InputNumber;
