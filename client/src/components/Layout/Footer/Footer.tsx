import React from 'react';
import Container from 'components/Layout/Container/Container';
import styles from './Footer.module.less';

const Footer = () => {
  return (
    <Container className={styles.footer}>
      Copyright 2019, Aleksandr Hovhannisyan and Rachana Podaralla
    </Container>
  );
};

export default Footer;
