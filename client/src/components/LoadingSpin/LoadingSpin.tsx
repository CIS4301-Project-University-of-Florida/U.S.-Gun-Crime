import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingSpin.module.less';

class LoadingSpin extends React.Component {
  public render() {
    return <Spin tip="Loading..." className={styles.loadingSpin} />;
  }
}

export default LoadingSpin;
