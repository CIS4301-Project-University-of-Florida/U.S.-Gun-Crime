import React from 'react';
import styles from './Container.module.less';

interface ContainerProps {
  className?: String;
}

class Container extends React.Component<ContainerProps> {
  public render() {
    return (
      <div className={`${styles.container} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
