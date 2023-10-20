import React, { useState } from 'react';
import { Select as SelectLib } from 'antd';
import type { SelectProps } from 'antd';
import { MAX_LENGTH } from '~/utils/constant';

type Props = SelectProps & {
  children?: React.ReactNode | React.ReactNode[];
  ref?: any;
}

function Select(props: Props) {
  const [searchText, setSearchText] = useState('');

  const handleSetMaxLength = (value: string) => {
    if (value.length > MAX_LENGTH) {
      return false;
    }
    setSearchText(value);
  };

  return (
    <SelectLib
      showSearch
      searchValue={searchText}
      onSearch={handleSetMaxLength}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      filterOption={(input, option) =>
        ((option?.label ?? option?.children) as unknown as string).toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    >
      {props?.children}
    </SelectLib>
  );
}

export const { Option } = SelectLib;
export default Select;
