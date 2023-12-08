import { Select, SelectProps, Spin } from 'antd';
import { Option } from '~/components/atoms/Select';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { search } from '~/api/member';

interface Props {
  placeholder?: string; 
  style?: React.CSSProperties
  className?: any;
}

const SearchInput = (props: Props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.pathname);

  // useEffect(() => {
  //   try {
  //     async () => {
  //       const res = await search({keyword: ''})
  //       if (res.data) {
  //         const allData = [...res.data?.post, ...res.data?.group];
  //         setData(allData)
  //         setFetching(false)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  const handleSearch = async (searchValue: string) => {
    setFetching(true)
    try {
      const res = await search({keyword: searchValue})
      if (res.data) {
        const allData = [...res.data?.post, ...res.data?.group];
        setData(allData)
        setFetching(false)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSelect = (item: any) => {
    console.log(item)
  }

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      className={props.className}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      // onSelect={}
      // notFoundContent={null}
      options={(data || []).map((d: any) => ({
        value: d._id,
        key: d._id,
        label: d.name ? d.name : d.description,
      }))}
    >
      {/* { (data || []).map((d: any) => (
        <Option 
          key={d._id}
          value={d._id}
        >
          {d.name ? d.name : d.description}
        </Option>
      ))
      } */}
    </Select>
  );
}

export default SearchInput
