import React from 'react';
import { Card, Icon } from 'antd';
import { CardProps } from 'antd/lib/card';
import styles from './CrimeCard.module.less';
import { GunCrime } from 'pages/CatalogPage/GunCrime';

class CrimeCard extends React.Component<GunCrime & CardProps> {
  public render() {
    return (
      <Card
        title={
          <div>
            <Icon type="calendar" /> {this.props.title}
          </div>
        }
        className={styles.crimeCard}
      >
        <section>
          <p>
            <Icon type="alert" />
            {this.props.N_KILLED} killed, {this.props.N_INJURED} injured
          </p>
        </section>
        <section>
          <p>
            <Icon type="global" />
            {this.props.CITY_OR_COUNTY}, {this.props.STATE}
          </p>
          <p>
            <Icon type="table" />
            Senate: {this.props.STATE_SENATE_DISTRICT} House:{' '}
            {this.props.STATE_HOUSE_DISTRICT}
          </p>
        </section>
        <section>
          <p>
            <Icon type="team" />
            {this.props.N_PARTICIPANTS} participants{', '}
            {this.props.N_GUNS_INVOLVED} guns
          </p>
        </section>
        <section>
          {this.props.NOTES ? (
            <p>
              <Icon type="info-circle" /> {this.props.NOTES}
            </p>
          ) : null}
          <a href={this.props.SOURCE_URL} target="_blank">
            <Icon type="notification" /> In the news
          </a>
        </section>
      </Card>
    );
  }
}

export default CrimeCard;
