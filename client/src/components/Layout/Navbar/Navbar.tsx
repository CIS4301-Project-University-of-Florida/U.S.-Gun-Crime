import React from 'react';
import Header from 'antd/lib/layout';
import styles from './Navbar.module.less';
import Container from 'components/Layout/Container/Container';
import { Link } from 'react-router-dom';
import { PageEnum } from 'pages/PageEnum';

const Navbar = () => {
  return (
    <Header className={styles.navbar}>
      <Container className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <Link to={PageEnum.HOME.url}>Home</Link>
          </li>
          <li>
            <Link to={PageEnum.DATA_CATALOG.url}>Catalog</Link>
          </li>
          <li>
            <Link to={PageEnum.ABOUT.url}>About</Link>
          </li>
        </ul>
      </Container>
    </Header>
  );
};

export default Navbar;
