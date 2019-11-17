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

const EqualityInput = (props: EqualityInputProps) => {
  const onNumberChange = (value: number | undefined) => {
    if (!value || value < props.numericalMinimum) {
      props.onNumberChange(props.numericalMinimum);
    } else {
      props.onNumberChange(value);
    }
  };

  return (
    <div className={styles.equalityInput}>
      <Select
        onChange={props.onEqualityChange}
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
        min={props.numericalMinimum}
        onChange={onNumberChange}
        defaultValue={props.numericalMinimum}
        className={styles.inputNumber}
      />
    </div>
  );
};

export default EqualityInput;
