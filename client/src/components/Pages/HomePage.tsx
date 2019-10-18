import React from 'react';
import Page from 'components/Layout/Page/Page';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  public render() {
    return (
      <Page title="U.S. Gun Crime Data">
        <p>TODO: Some sort of call to action goes here</p>
        <Button type="primary">
          <Link to="/catalog">Browse data</Link>
        </Button>
        <Button type="link">
          <a href="https://github.com/CIS4301-Project-University-of-Florida/U.S.-Gun-Crime">
            View on GitHub
          </a>
        </Button>
      </Page>
    );
  }
}

export default HomePage;
