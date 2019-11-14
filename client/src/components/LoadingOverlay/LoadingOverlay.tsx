import React from 'react';
import { Spin, Icon } from 'antd';
import styles from './LoadingOverlay.module.less';

interface LoadingOverlayProps {
  loading: boolean;
}

/**
 * Renders an overlay with a loading spinner and some opacity
 * over whatever content is loading. Useful for things like
 * cards, maps, etc. Simply wrap the component with this and
 * pass in the loading prop using some sort of state. see
 * GeographicDistribution.tsx for an example of its usage.
 */
class LoadingOverlay extends React.Component<LoadingOverlayProps> {
  public render() {
    return (
      <div className={styles.loadingOverlayContainer}>
        {this.props.loading ? (
          <div className={styles.loadingOverlay}>
            <Spin
              indicator={
                <Icon type="loading" style={{ fontSize: 50 }} spin={true} />
              }
            />
          </div>
        ) : null}
        {this.props.children}
      </div>
    );
  }
}

export default LoadingOverlay;
