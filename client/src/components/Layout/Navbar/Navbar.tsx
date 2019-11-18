import React from 'react';
import Header from 'antd/lib/layout';
import styles from './Navbar.module.less';
import Container from 'components/Layout/Container/Container';
import { Link } from 'react-router-dom';
import { PageEnum } from 'pages/PageEnum';
import NavMenu from './NavMenu';

const Navbar = () => {
  return (
    <Header className={styles.navbar}>
      <Container className={styles.container}>
        <Link to={PageEnum.HOME.url} className={styles.logo}>
          U.S. Gun Crimes
        </Link>
        <NavMenu />
      </Container>
    </Header>
  );
};

export default Navbar;
