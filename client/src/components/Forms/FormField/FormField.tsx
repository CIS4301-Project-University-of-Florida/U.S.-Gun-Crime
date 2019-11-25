import React from 'react';
import Form, { FormItemProps } from 'antd/lib/form';
import styles from './FormField.module.less';

const FormField = (props: React.PropsWithChildren<FormItemProps>) => {
  return (
    <Form.Item className={styles.formField} {...props}>
      {props.children}
    </Form.Item>
  );
};

export default FormField;
