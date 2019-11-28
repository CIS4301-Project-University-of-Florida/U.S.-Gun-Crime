import React from 'react';
import { Card } from 'antd';
import { HorizontalBar } from 'react-chartjs-2';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';

interface HorizontalBarGraphProps {
  isLoading: boolean;
  data: any;
  showxAxisTicks: boolean;
  showTooltips: boolean;
}

const HorizontalBarGraph = (
  props: React.PropsWithChildren<HorizontalBarGraphProps>
) => {
  return (
    <Card>
      {props.children}
      <LoadingSpin spinning={props.isLoading}>
        <div style={{ height: 1200 }}>
          <HorizontalBar
            options={{
              responsive: true,
              maintainAspectRatio: false,
              tooltips: { enabled: props.showTooltips && !props.isLoading },
              hover: { mode: null },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: props.showxAxisTicks && !props.isLoading,
                    },
                  },
                ],
              },
            }}
            data={props.data}
          />
        </div>
      </LoadingSpin>
    </Card>
  );
};

export default HorizontalBarGraph;
