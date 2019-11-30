import React from 'react';
import { Icon } from 'antd';
import { CardProps } from 'antd/lib/card';
import styles from './CrimeCard.module.less';
import { GunCrime } from 'pages/CatalogPage/GunCrime';
import MaterialCard from 'components/MaterialCard/MaterialCard';

interface CrimeCardProps extends CardProps, GunCrime {
  launchDetailsModal: (id: number) => void;
}

const CrimeCard = (props: CrimeCardProps) => {
  const onNewsAnchorClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // Don't trigger onCardClicked if just the news article was clicked
    event.stopPropagation();
  };

  const onCardClicked = () => {
    props.launchDetailsModal(props.INCIDENT_ID);
  };

  return (
    <MaterialCard
      title={
        <div>
          <Icon type="calendar" /> {props.title}
        </div>
      }
      className={styles.crimeCard}
      hoverable={true}
      onClick={onCardClicked}
    >
      <section>
        <p>
          <Icon type="alert" />
          {props.N_KILLED} killed, {props.N_INJURED} injured
        </p>
      </section>
      <section>
        <p>
          <Icon type="global" />
          {props.CITY_OR_COUNTY}, {props.STATE}
        </p>
        <p>
          <Icon type="table" />
          Senate: {props.STATE_SENATE_DISTRICT} House:{' '}
          {props.STATE_HOUSE_DISTRICT}
        </p>
      </section>
      <section>
        <p>
          <Icon type="team" />
          {props.N_PARTICIPANTS} participant
          {props.N_PARTICIPANTS > 1 ? 's' : ''}
          {', '}
          {props.N_GUNS_INVOLVED
            ? `${props.N_GUNS_INVOLVED} gun${
                props.N_GUNS_INVOLVED > 1 ? 's' : ''
              }`
            : 'unknown # of guns'}
        </p>
      </section>
      <section>
        {props.NOTES ? (
          <p>
            <Icon type="info-circle" /> {props.NOTES}
          </p>
        ) : null}
        {props.SOURCE_URL ? (
          <a
            href={props.SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNewsAnchorClicked}
          >
            <Icon type="notification" /> In the news
          </a>
        ) : null}
      </section>
    </MaterialCard>
  );
};

export default CrimeCard;
