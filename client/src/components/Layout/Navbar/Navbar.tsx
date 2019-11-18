import React from 'react';
import Header from 'antd/lib/layout';
import styles from './Navbar.module.less';
import Container from 'components/Layout/Container/Container';
import { Link } from 'react-router-dom';
import { PageEnum } from 'pages/PageEnum';
import { Menu } from 'antd';

const Navbar = () => {
  return (
    <Header className={styles.navbar}>
      <Container className={styles.container}>
        <Link to={PageEnum.HOME.url}>
          <div className={styles.logo} />
        </Link>
        <Menu theme="dark" mode="horizontal" className={styles.menu}>
          <Menu.Item key="1">
            <Link to={PageEnum.DATA_VISUALIZATIONS.url}>Visualizations</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={PageEnum.RANKINGS.url}>Rankings</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={PageEnum.GEOGRAPHIC_DISTRIBUTION.url}>
              Geographic Distribution
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={PageEnum.DEEP_DIVE.url}>Database Search</Link>
          </Menu.Item>
        </Menu>
      </Container>
    </Header>
  );
};

export default Navbar;
