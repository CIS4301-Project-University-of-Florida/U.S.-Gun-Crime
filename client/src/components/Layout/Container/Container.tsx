import React from 'react';
import styles from './Container.module.less';

interface ContainerProps {
  className?: String;
}

const Container = (props: React.PropsWithChildren<ContainerProps>) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Container;
