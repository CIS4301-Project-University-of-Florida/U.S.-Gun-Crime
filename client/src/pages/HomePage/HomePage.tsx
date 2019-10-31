import React from 'react';
import Page from 'components/Layout/Page/Page';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PageEnum } from 'pages/PageEnum';

class HomePage extends React.Component {
  // TODO: remove, this is only for demo purposes
  private callApi = async () => {
    const response = await fetch('/api/incidents/firstFour');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  // TODO: remove, see above
  public componentDidMount() {
    // tslint:disable-next-line: no-console
    this.callApi().then(value => console.log(value));
  }

  public render() {
    return (
      <Page title={PageEnum.HOME.title}>
        <p>Stay informed—explore U.S. gun crime trends for 2013–2018.</p>
        <Button type="primary">
          <Link to={PageEnum.DATA_CATALOG.url}>Browse data</Link>
        </Button>
        <Button type="link">
          <a href="https://github.com/CIS4301-Project-University-of-Florida/U.S.-Gun-Crime">
            Explore on GitHub
          </a>
        </Button>
      </Page>
    );
  }
}

export default HomePage;
