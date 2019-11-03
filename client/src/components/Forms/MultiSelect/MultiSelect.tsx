import Select, { SelectProps } from 'antd/lib/select';
import React from 'react';
import styles from './MultiSelect.module.less';

const { Option } = Select;

interface MultiSelectProps extends SelectProps<string[]> {
  data: string[];
}

class MultiSelect extends React.Component<MultiSelectProps> {
  public render() {
    return (
      <Select
        {...this.props}
        mode="multiple"
        dropdownMatchSelectWidth={false}
        className={`${styles.multiSelect} ${
          this.props.className ? this.props.className : ''
        }`}
      >
        {this.props.data.map(option => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
  }
}

export default MultiSelect;
