import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingSpin.module.less';
import { SpinProps } from 'antd/lib/spin';

class LoadingSpin extends React.Component<SpinProps> {
  public render() {
    return (
      <Spin
        {...this.props}
        tip={this.props.tip ? this.props.tip : 'Loading...'}
        className={styles.loadingSpin}
      />
    );
  }
}

export default LoadingSpin;
