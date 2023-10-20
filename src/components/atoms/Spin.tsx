import React from 'react';
import { Spin as SpinLib } from 'antd';
import type { SpinProps } from 'antd';

type Props = SpinProps & {
  children?: React.ReactNode | React.ReactNode[];
}

function Spin(props: Props) {
  return (
    <SpinLib {...props}>
      {props?.children}
    </SpinLib>
  );
}


export default Spin;
