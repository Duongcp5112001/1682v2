import React from 'react';
import { Input } from 'antd';

const { TextArea: TextAreaAntd } = Input;

interface Props {
  defaultValue?: string;
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function TextAreaInput(props: Props) {
  return (
    <TextAreaAntd {...props} />
  );
}

export default TextAreaInput;
