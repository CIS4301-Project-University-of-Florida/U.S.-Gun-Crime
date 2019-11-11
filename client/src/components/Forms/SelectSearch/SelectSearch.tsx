import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
const { Option } = Select;

interface ISelectSearch extends SelectProps {
  data: any[];
}

class SelectSearch extends React.Component<ISelectSearch> {
  public render() {
    return (
      <Select showSearch={true} allowClear={true} {...this.props}>
        {this.props.data.map(element => (
          <Option key={element} value={element} title={element}>
            {element}
          </Option>
        ))}
      </Select>
    );
  }
}

export default SelectSearch;
