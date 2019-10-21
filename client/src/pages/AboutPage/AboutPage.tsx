import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';

class AboutPage extends React.Component {
  public render() {
    return (
      <Page title={PageEnum.ABOUT.title}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Non quam
          lacus suspendisse faucibus.
        </p>
        <p>
          Ultrices dui sapien eget mi proin. Mattis ullamcorper velit sed
          ullamcorper morbi tincidunt ornare massa. Gravida quis blandit turpis
          cursus in hac habitasse platea. Sed viverra ipsum nunc aliquet
          bibendum enim. Ac tortor vitae purus faucibus ornare suspendisse sed
          nisi lacus.
        </p>
        <p>
          Varius morbi enim nunc faucibus. Vitae sapien pellentesque habitant
          morbi tristique. Mi eget mauris pharetra et ultrices neque ornare. Non
          consectetur a erat nam at lectus. Habitasse platea dictumst vestibulum
          rhoncus est. Massa tincidunt dui ut ornare lectus sit. Ut venenatis
          tellus in metus vulputate eu scelerisque felis imperdiet.
        </p>
      </Page>
    );
  }
}

export default AboutPage;
