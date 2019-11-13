import React from 'react';
import { Icon } from 'antd';

interface MapIconProps {
  lat: number;
  lng: number;
}

const MapIcon = (props: MapIconProps) => {
  return (
    <div
      style={{
        backgroundColor: '#B50603',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
      }}
    />
  );
};

export default MapIcon;
