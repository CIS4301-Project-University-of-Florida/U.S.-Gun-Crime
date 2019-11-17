import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
const { Option } = Select;

interface ISelectSearch extends SelectProps {
  data: any[];
}

const SelectSearch = (props: ISelectSearch) => {
  return (
    <Select showSearch={true} allowClear={true} {...props}>
      {props.data.map(element => (
        <Option key={element} value={element} title={element}>
          {element}
        </Option>
      ))}
    </Select>
  );
};

export default SelectSearch;
