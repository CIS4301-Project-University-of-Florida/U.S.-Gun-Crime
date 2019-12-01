import React from 'react';
import { GunCrime } from 'pages/GunCrime';
import { List, Icon, Result, Modal } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';
import moment from 'moment';
import axios from 'axios';
import styles from './CrimeResults.module.less';
import Gun from 'entityTypes/Gun';
import Participant from 'entityTypes/Participant';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import IncidentCharacteristic from 'entityTypes/IncidentCharacteristic';
import AggregateStatistics from './AggregateStatistics';
import { DATE_FORMAT } from 'components/DateRangePicker/DateRangePicker';
import { useState } from 'react';

interface CrimeResultsProps {
  gunCrimes: GunCrime[];
  dataFetchFailed: boolean;
}

const interpret = (field: any) => {
  return field ? field : 'Unknown';
};

const CrimeResults = (props: CrimeResultsProps) => {
  const [detailsModalVisible, setDetailsModalVisibility] = useState<boolean>(
    false
  );
  const [detailsModalID, setDetailsModalID] = useState<number>(-1);
  const [waitingForDetails, setWaitingForDetails] = useState<boolean>(false);
  const [
    detailsModalCharacteristics,
    setDetailsModalCharacteristics,
  ] = useState<IncidentCharacteristic[]>([]);
  const [detailsModalParticipants, setDetailsModalParticipants] = useState<
    Participant[]
  >([]);
  const [detailsModalGuns, setDetailsModalGuns] = useState<Gun[]>([]);

  const showCrimeDetails = async (id: number) => {
    // Don't refetch the modal data if it's the one we had open just before
    if (id === detailsModalID) {
      setDetailsModalVisibility(true);
      return;
    }

    setDetailsModalID(id);
    setDetailsModalVisibility(true);
    setWaitingForDetails(true);

    try {
      const characteristics = await axios.get(
        `/api/incident/${id}/characteristics`
      );
      const participants = await axios.get(`/api/incident/${id}/participants`);
      const guns = await axios.get(`/api/incident/${id}/guns`);

      setWaitingForDetails(false);
      setDetailsModalCharacteristics(characteristics.data);
      setDetailsModalParticipants(participants.data);
      setDetailsModalGuns(guns.data);
    } catch (error) {
      console.log(`CrimeResults's showCrimeDetails: ${error}`);
    }
  };

  const hideCrimeDetails = () => {
    setDetailsModalVisibility(false);
  };

  const renderCrimeCard = (crime: GunCrime) => {
    return (
      <CrimeCard
        title={`#${crime.INCIDENT_ID} on ${moment(crime.INCIDENT_DATE).format(
          DATE_FORMAT
        )}`}
        key={crime.INCIDENT_ID}
        launchDetailsModal={showCrimeDetails}
        {...crime}
      />
    );
  };

  return (
    <section>
      {props.gunCrimes.length !== 0 ? (
        <AggregateStatistics gunCrimes={props.gunCrimes} />
      ) : null}
      <Modal
        visible={detailsModalVisible}
        title={`Details for incident #${detailsModalID}`}
        destroyOnClose={false}
        onOk={hideCrimeDetails}
        onCancel={hideCrimeDetails}
        footer={null}
      >
        {waitingForDetails ? (
          <LoadingSpin tip="Loading details..." />
        ) : (
          <>
            <section style={{ marginBottom: '20px' }}>
              <h4>Characteristics</h4>
              {detailsModalCharacteristics.length ? (
                <ul>
                  {detailsModalCharacteristics.map(
                    (c: IncidentCharacteristic) => (
                      <li key={`${c.INCIDENT_ID}${c.INCIDENT_CHARACTERISTIC}`}>
                        {c.INCIDENT_CHARACTERISTIC}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                'Characteristic data unavailable for this incident.'
              )}
            </section>
            <section>
              <h4>Participants involved:</h4>
              <div className={styles.detailsModalGrid}>
                {detailsModalParticipants.map((p: Participant) => {
                  return (
                    <p key={`participant${p.ID}`}>
                      Name: {interpret(p.NAME)}
                      <br />
                      Age: {p.AGE !== null ? p.AGE : 'Unknown'}
                      <br />
                      Gender:{' '}
                      {p.GENDER === 'M'
                        ? 'Male'
                        : p.GENDER === 'F'
                        ? 'Female'
                        : 'Unknown'}
                      <br />
                      Type: {interpret(p.TYPE)}
                      <br />
                      Status: {interpret(p.STATUS)}
                      <br />
                      Relationship: {interpret(p.RELATIONSHIP)}
                    </p>
                  );
                })}
              </div>
            </section>
            <section>
              <h4>Guns involved:</h4>
              <div className={styles.detailsModalGrid}>
                {detailsModalGuns.length
                  ? detailsModalGuns.map((g: Gun) => {
                      return (
                        <p key={`gun${g.ID}`}>
                          Type: {interpret(g.TYPE)}
                          <br />
                          Stolen:{' '}
                          {g.STOLEN === 1
                            ? 'Yes'
                            : g.STOLEN === 0
                            ? 'No'
                            : 'Unknown'}
                        </p>
                      );
                    })
                  : 'Gun data unavailable for this incident.'}
              </div>
            </section>
          </>
        )}
      </Modal>
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
