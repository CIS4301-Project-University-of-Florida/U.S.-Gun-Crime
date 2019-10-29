import React from 'react';
import { Form } from 'antd';
import styles from './DataForm.module.less';

class DataForm extends React.Component {
  public render() {
    return (
      <Form layout="inline" className={styles.dataForm}>
        {this.props.children}
      </Form>
    );
  }
}

export default DataForm;
