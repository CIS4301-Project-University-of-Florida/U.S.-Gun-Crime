import React from 'react';
import { Card, Icon } from 'antd';
import { CardProps } from 'antd/lib/card';
import styles from './CrimeCard.module.less';
import { GunCrime } from 'pages/CatalogPage/GunCrime';

class CrimeCard extends React.Component<GunCrime & CardProps> {
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
        <div>
          {this.props.N_KILLED} killed, {this.props.N_INJURED} injured
          <section>
            <Icon type="global" />
            {this.props.CITY_OR_COUNTY},{this.props.STATE}({this.props.LATITUDE}
            , {this.props.LONGITUDE}) Senate:
            {this.props.STATE_SENATE_DISTRICT}
            House: {this.props.STATE_HOUSE_DISTRICT}
          </section>
          <section>
            {this.props.N_PARTICIPANTS} participants
            {this.props.N_GUNS_INVOLVED} guns
          </section>
          <section>
            {this.props.NOTES ? `Notes: ${this.props.NOTES}` : null}
            In the news:{' '}
            <a href={this.props.SOURCE_URL} target="_blank">
              Click me
            </a>
          </section>
        </div>
      </Card>
    );
  }
}

export default CrimeCard;
