import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingSpin.module.less';
import { SpinProps } from 'antd/lib/spin';

const LoadingSpin = (props: React.PropsWithChildren<SpinProps>) => {
  return (
    <Spin
      {...props}
      tip={props.tip ? props.tip : 'Loading...'}
      className={styles.loadingSpin}
    >
      {props.children}
    </Spin>
  );
};

export default LoadingSpin;
