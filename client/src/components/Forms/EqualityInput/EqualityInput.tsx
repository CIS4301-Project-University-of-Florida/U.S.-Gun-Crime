import React, { ChangeEvent } from 'react';
import { Select, Input, InputNumber } from 'antd';
import styles from './EqualityInput.module.less';
const { Option } = Select;

const equalityOptions = ['>=', '>', '=', '<', '<='];
export const equalityDefault = '>=';

interface EqualityInputProps {
  onEqualityChange: (value: string) => void;
  onNumberChange: (value: number) => void;
  numericalMinimum: number;
}

class EqualityInput extends React.Component<EqualityInputProps> {
  public constructor(props: EqualityInputProps) {
    super(props);
  }

  private onNumberChange = (value: number | undefined) => {
    if (!value || value < this.props.numericalMinimum) {
      this.props.onNumberChange(this.props.numericalMinimum);
    } else {
      this.props.onNumberChange(value);
    }
  };

  public render() {
    return (
      <div className={styles.equalityInput}>
        <Select
          onChange={this.props.onEqualityChange}
          defaultValue={equalityDefault}
          className={styles.select}
        >
          {equalityOptions.map((option: string) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <InputNumber
          min={this.props.numericalMinimum}
          onChange={this.onNumberChange}
          defaultValue={this.props.numericalMinimum}
          className={styles.inputNumber}
        />
      </div>
    );
  }
}

export default EqualityInput;
