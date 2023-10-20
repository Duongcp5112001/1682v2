import React from 'react';
import { List as ListAntd, ListProps } from 'antd';

type Props = ListProps<any> & {
  children?: React.ReactNode | React.ReactNode[];
}

function List(props: Props) {
  return (
    <ListAntd {...props}>
      {props?.children}
    </ListAntd>
  );
}
export const { Item } = ListAntd;

export default List;
