import React from 'react';
import { Table as TableLib } from 'antd';
import type { TableProps } from 'antd/lib/table';

function Table(props: TableProps<any>) {
  return (
    <TableLib
      {...props}
    />
  );
}

export const { Summary } = TableLib;

export default Table;
