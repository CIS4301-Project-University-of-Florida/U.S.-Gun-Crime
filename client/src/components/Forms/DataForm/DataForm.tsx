import React from 'react';
import { Form } from 'antd';
import styles from './DataForm.module.less';
import { FormProps } from 'antd/lib/form';

const DataForm = (props: FormProps) => {
  return (
    <Form
      layout={props.layout ? props.layout : 'inline'}
      className={styles.dataForm}
    >
      {props.children}
    </Form>
  );
};

export default DataForm;
