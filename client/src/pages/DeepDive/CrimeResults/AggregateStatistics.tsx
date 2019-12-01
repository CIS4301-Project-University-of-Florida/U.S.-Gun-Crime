import React from 'react';
import { GunCrime } from 'pages/GunCrime';
import { Statistic } from 'antd';
import styles from './AggregateStatistics.module.less';

interface AggregateStatisticsProps {
  gunCrimes: GunCrime[];
}

const AggregateStatistics = (props: AggregateStatisticsProps) => {
  return (
    <section className={styles.statistics}>
      <h2>Statistics at a Glance:</h2>
      <div className={styles.statisticGrid}>
        <Statistic title="Total # of crimes" value={props.gunCrimes.length} />
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
  );
};

export default AggregateStatistics;
