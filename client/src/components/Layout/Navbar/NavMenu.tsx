import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';
import { PageEnum } from 'pages/PageEnum';

const NavMenu = (props: RouteComponentProps) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ minHeight: '64px', lineHeight: '64px' }}
      defaultSelectedKeys={[props.location.pathname]}
    >
      <Menu.Item key={PageEnum.DATA_VISUALIZATIONS.url}>
        <Link to={PageEnum.DATA_VISUALIZATIONS.url}>Visualizations</Link>
      </Menu.Item>
      <Menu.Item key={PageEnum.RANKINGS.url}>
        <Link to={PageEnum.RANKINGS.url}>Rankings</Link>
      </Menu.Item>
      <Menu.Item key={PageEnum.GEOGRAPHIC_DISTRIBUTION.url}>
        <Link to={PageEnum.GEOGRAPHIC_DISTRIBUTION.url}>
          Geographic Distribution
        </Link>
      </Menu.Item>
      <Menu.Item key={PageEnum.DEEP_DIVE.url}>
        <Link to={PageEnum.DEEP_DIVE.url}>Database Search</Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(NavMenu);
