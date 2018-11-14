import React from 'react';
import { Menu, Icon, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Menu size='mini' borderless attached inverted color='grey'>
      <Container textAlign='right'>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Icon fitted name='copyright outline' /> 2018 ymr-39 
          </Menu.Item>
          <a href="https://github.com">
            <Menu.Item>
              <Icon name='github' />
            </Menu.Item>
          </a>
          <a href="https://twitter.com">
            <Menu.Item>
              <Icon name='twitter' />
            </Menu.Item>
          </a>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Footer;