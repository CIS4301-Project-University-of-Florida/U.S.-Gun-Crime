import React from 'react';
import Form, { FormItemProps } from 'antd/lib/form';
import styles from './FormField.module.less';

class FormField extends React.Component<FormItemProps> {
  public render() {
    return (
      <Form.Item className={styles.formField} {...this.props}>
        {this.props.children}
      </Form.Item>
    );
  }
}

export default FormField;
