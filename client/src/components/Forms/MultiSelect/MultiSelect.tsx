import Select, { SelectProps } from 'antd/lib/select';
import React from 'react';
import styles from './MultiSelect.module.less';

const { Option } = Select;

interface MultiSelectProps extends SelectProps<string[]> {
  data: string[];
}

const MultiSelect = (props: MultiSelectProps) => {
  return (
    <Select
      {...props}
      mode="multiple"
      dropdownMatchSelectWidth={false}
      className={`${styles.multiSelect} ${
        props.className ? props.className : ''
      }`}
    >
      {props.data.map(option => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default MultiSelect;
