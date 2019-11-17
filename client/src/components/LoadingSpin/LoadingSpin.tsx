import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingSpin.module.less';
import { SpinProps } from 'antd/lib/spin';

const LoadingSpin = (props: SpinProps) => {
  return (
    <Spin
      {...props}
      tip={props.tip ? props.tip : 'Loading...'}
      className={styles.loadingSpin}
    />
  );
};

export default LoadingSpin;
