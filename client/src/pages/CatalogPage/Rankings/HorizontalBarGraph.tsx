import React from 'react';
import { Card, Spin } from 'antd';
import { HorizontalBar } from 'react-chartjs-2';

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
      {!props.isLoading ? (
        <div style={{ height: 1200 }}>
          <HorizontalBar
            options={{
              responsive: true,
              maintainAspectRatio: false,
              tooltips: { enabled: props.showTooltips },
              hover: { mode: null },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: props.showxAxisTicks,
                    },
                  },
                ],
              },
            }}
            data={props.data}
          />
        </div>
      ) : (
        <Spin tip="Loading...">
          <div style={{ height: 1200 }}>
            <HorizontalBar
              options={{
                responsive: true,
                maintainAspectRatio: false,
                tooltips: { enabled: false },
                hover: { mode: null },
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
              data={props.data}
            />
          </div>
        </Spin>
      )}
    </Card>
  );
};

export default HorizontalBarGraph;
