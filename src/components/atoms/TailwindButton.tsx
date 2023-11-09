import { Button, ButtonProps } from 'antd';
import React from 'react';

interface Props extends ButtonProps {
  children?: React.ReactNode | React.ReactNode[];
  type?:  "link" | "text" | "default" | "primary" | "dashed" | undefined;
  customClass?: string;
}
const TailwindButton = (props: Props) => {

  let defaultClassName = 'bg-btnAntd';
  let buttonClassName = `${defaultClassName} ${props.customClass|| ''}`;

  switch (props.type) {
    case 'primary':
      return (
        <Button
          className={buttonClassName}
          {...props}
        >
          {props?.children}
        </Button>
      )
    case 'default':
      return (
        <Button
          className={`bg-btnSecondary text-white hover:bg-gray-500 ${props.customClass}`}
          {...props}
        >
          {props?.children}
        </Button>
      )
    default:
      return (
        <Button
          className={props.customClass}
          {...props}
        >
          {props?.children}
        </Button>
      )
      
  }
};

export default TailwindButton;
