import React from 'react';
import { GunCrime } from 'pages/CatalogPage/GunCrime';
import { Statistic, List, Icon, Result } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';
import moment from 'moment';
import { DATE_FORMAT } from '../DateFormat';
import styles from './CrimeResults.module.less';

interface CrimeResultsProps {
  gunCrimes: GunCrime[];
  dataFetchFailed: boolean;
}

const CrimeResults = (props: CrimeResultsProps) => {
  function renderCrimeCard(crime: GunCrime) {
    return (
      <CrimeCard
        title={`#${crime.INCIDENT_ID} on ${moment(crime.INCIDENT_DATE).format(
          DATE_FORMAT
        )}`}
        key={crime.INCIDENT_ID}
        {...crime}
      />
    );
  }

  return (
    <section>
      {props.gunCrimes.length !== 0 ? (
        <section className={styles.statistics}>
          <h2>Statistics at a Glance:</h2>
          <div className={styles.statisticGrid}>
            <Statistic
              title="Total # of crimes"
              value={props.gunCrimes.length}
            />
            <Statistic
              title="Total killed"
              value={props.gunCrimes.reduce(
                (acc, { N_KILLED }) => acc + N_KILLED,
                0
              )}
            />
            <Statistic
              title="Total injured"
              value={props.gunCrimes.reduce(
                (acc, { N_INJURED }) => acc + N_INJURED,
                0
              )}
            />
            <Statistic
              title="Total # of guns involved"
              value={props.gunCrimes.reduce(
                (acc, { N_GUNS_INVOLVED }) => acc + N_GUNS_INVOLVED,
                0
              )}
            />
          </div>
        </section>
      ) : null}
      <List
        pagination={{ showSizeChanger: true, showQuickJumper: true }}
        dataSource={props.gunCrimes}
        renderItem={renderCrimeCard}
        locale={{
          emptyText: (
            <Result
              icon={<Icon type="frown" />}
              title={
                props.dataFetchFailed
                  ? 'Failed to fetch data'
                  : 'No matching results'
              }
              subTitle={
                props.dataFetchFailed
                  ? `This may be due to a connection issue, or maybe 
                there's too much data to return. Try applying more filters.`
                  : 'Try tweaking your search parameters'
              }
            />
          ),
        }}
      />
    </section>
  );
};

export default CrimeResults;
