import React from 'react';
import { Card, Icon } from 'antd';
import { CardProps } from 'antd/lib/card';
import styles from './CrimeCard.module.less';

class CrimeCard extends React.Component<CardProps> {
  public render() {
    return (
      <Card
        hoverable={true}
        title={
          <div>
            <Icon type="calendar" /> {this.props.title}
          </div>
        }
        className={styles.crimeCard}
      >
        <div className={styles.crimeCardGrid}>
          <div>
            <section>
              <Icon type="global" />
              City, State
            </section>
            <section>
              <Icon type="number" />x killed, y injured
            </section>
          </div>
          <div>
            <section>
              <Icon type="info-circle" />
              <div>Characteristic</div>
              <div>Characteristic</div>
              <div>Characteristic</div>
            </section>
            <section />
          </div>
          <div>Stuff</div>
        </div>
      </Card>
    );
  }
}

export default CrimeCard;
