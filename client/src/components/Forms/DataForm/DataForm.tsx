import React from 'react';
import { Form } from 'antd';
import styles from './DataForm.module.less';
import { FormProps } from 'antd/lib/form';

class DataForm extends React.Component<FormProps> {
  public render() {
    return (
      <Form
        layout={this.props.layout ? this.props.layout : 'inline'}
        className={styles.dataForm}
      >
        {this.props.children}
      </Form>
    );
  }
}

export default DataForm;
