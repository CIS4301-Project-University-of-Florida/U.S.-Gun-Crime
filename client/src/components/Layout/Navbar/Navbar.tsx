import React from 'react';
import Header from 'antd/lib/layout';
import styles from './Navbar.module.scss';
import Container from 'components/Layout/Container/Container';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Header className={styles.navbar}>
      <Container className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </Container>
    </Header>
  );
};

export default Navbar;
