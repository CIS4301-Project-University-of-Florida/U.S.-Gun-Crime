import React, { ChangeEvent } from 'react';
import { Select, Input } from 'antd';
import styles from './EqualityInput.module.less';
const { Option } = Select;

const equalityOptions = ['>=', '>', '=', '<', '<='];

interface EqualityInputProps {
  onEqualityChange: (value: string) => void;
  onNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  numericalMinimum: number;
}

class EqualityInput extends React.Component<EqualityInputProps> {
  public constructor(props: EqualityInputProps) {
    super(props);
  }

  private onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) < this.props.numericalMinimum) {
      event.preventDefault();
    } else {
      this.props.onNumberChange(event);
    }
  };

  public render() {
    return (
      <div className={styles.equalityInput}>
        <Select
          onChange={this.props.onEqualityChange}
          defaultValue={'='}
          className={styles.select}
        >
          {equalityOptions.map((option: string) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <Input
          type="number"
          min={this.props.numericalMinimum}
          onChange={this.onNumberChange}
        />
      </div>
    );
  }
}

export default EqualityInput;
