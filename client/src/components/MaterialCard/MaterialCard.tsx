import React from 'react';
import Card, { CardProps } from 'antd/lib/card';
import styles from './MaterialCard.module.less';

const MaterialCard = (props: CardProps) => {
  return (
    <Card
      hoverable={true}
      {...props}
      className={`${styles.materialCard} ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </Card>
  );
};

export default MaterialCard;
