import React from 'react';
import { GunCrime } from 'pages/CatalogPage/GunCrime';
import { Statistic, List, Icon, Result, Modal } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';
import moment from 'moment';
import { DATE_FORMAT } from '../DateFormat';
import axios from 'axios';
import styles from './CrimeResults.module.less';
import Gun from 'entityTypes/Gun';
import Participant from 'entityTypes/Participant';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import IncidentCharacteristic from 'entityTypes/IncidentCharacteristic';
import AggregateStatistics from './AggregateStatistics';

// TODO: maybe extract the modal into its own component
interface CrimeResultsState {
  detailsModalVisible: boolean;
  detailsModalID: number;
  detailsModalCharacteristics: IncidentCharacteristic[];
  detailsModalParticipants: Participant[];
  detailsModalGuns: Gun[];
  waitingForDetailsData: boolean;
}

interface CrimeResultsProps {
  gunCrimes: GunCrime[];
  dataFetchFailed: boolean;
}

const interpret = (field: any) => {
  return field ? field : 'Unknown';
};

class CrimeResults extends React.Component<
  CrimeResultsProps,
  CrimeResultsState
> {
  public constructor(props: CrimeResultsProps) {
    super(props);
    this.state = {
      detailsModalVisible: false,
      detailsModalID: -1,
      detailsModalCharacteristics: [],
      detailsModalParticipants: [],
      detailsModalGuns: [],
      waitingForDetailsData: false,
    };
  }

  private showCrimeDetails = async (id: number) => {
    // Don't refetch the modal data if it's the one we had open just before
    if (id === this.state.detailsModalID) {
      this.setState({ ...this.state, detailsModalVisible: true });
      return;
    }

    this.setState({
      ...this.state,
      detailsModalID: id,
      detailsModalVisible: true,
      waitingForDetailsData: true,
    });

    try {
      const characteristics = await axios.get(
        `/api/incident/${id}/characteristics`
      );
      const participants = await axios.get(`/api/incident/${id}/participants`);
      const guns = await axios.get(`/api/incident/${id}/guns`);

      this.setState({
        ...this.state,
        waitingForDetailsData: false,
        detailsModalCharacteristics: characteristics.data,
        detailsModalParticipants: participants.data,
        detailsModalGuns: guns.data,
      });
    } catch (error) {}
  };

  private hideCrimeDetails = () => {
    this.setState({ ...this.state, detailsModalVisible: false });
  };

  private renderCrimeCard = (crime: GunCrime) => {
    return (
      <CrimeCard
        title={`#${crime.INCIDENT_ID} on ${moment(crime.INCIDENT_DATE).format(
          DATE_FORMAT
        )}`}
        key={crime.INCIDENT_ID}
        launchDetailsModal={this.showCrimeDetails}
        {...crime}
      />
    );
  };

  public render() {
    return (
      <section>
        {this.props.gunCrimes.length !== 0 ? (
          <AggregateStatistics gunCrimes={this.props.gunCrimes} />
        ) : null}
        <Modal
          visible={this.state.detailsModalVisible}
          title={`Details for incident #${this.state.detailsModalID}`}
          destroyOnClose={false}
          onOk={this.hideCrimeDetails}
          onCancel={this.hideCrimeDetails}
          footer={null}
        >
          {this.state.waitingForDetailsData ? (
            <LoadingSpin tip="Loading details..." />
          ) : (
            <>
              <section>
                <h4>Characteristics</h4>
                {this.state.detailsModalCharacteristics.map(
                  (c: IncidentCharacteristic) => (
                    <p key={`${c.INCIDENT_ID}${c.INCIDENT_CHARACTERISTIC}`}>
                      {c.INCIDENT_CHARACTERISTIC}
                    </p>
                  )
                )}
              </section>
              <section>
                <h4>Participants involved:</h4>
                {this.state.detailsModalParticipants.map((p: Participant) => {
                  return (
                    <p key={`participant${p.ID}`}>
                      Name: {interpret(p.NAME)}
                      <br />
                      Age: {interpret(p.AGE)}
                      <br />
                      Type: {interpret(p.TYPE)}
                      <br />
                      Status: {interpret(p.STATUS)}
                      <br />
                      Relationship: {interpret(p.RELATIONSHIP)}
                    </p>
                  );
                })}
              </section>
              <section>
                <h4>Guns involved:</h4>
                {this.state.detailsModalGuns.map((g: Gun) => {
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
                })}
              </section>
            </>
          )}
        </Modal>
        <List
          pagination={{ showSizeChanger: true, showQuickJumper: true }}
          dataSource={this.props.gunCrimes}
          renderItem={this.renderCrimeCard}
          locale={{
            emptyText: (
              <Result
                icon={<Icon type="frown" />}
                title={
                  this.props.dataFetchFailed
                    ? 'Failed to fetch data'
                    : 'No matching results'
                }
                subTitle={
                  this.props.dataFetchFailed
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
  }
}

export default CrimeResults;
