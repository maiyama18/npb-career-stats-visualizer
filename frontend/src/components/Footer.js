import React from 'react';
import { Icon, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div>
      <Container textAlign='right'>
        <Icon fitted name='copyright outline' /> 2018 ymr-39 
        <span style={{ marginLeft: '10px' }}>
          <a href="https://google.com">
            <Icon name='github' />
          </a> 
          <a href="/">
            <Icon name='twitter' />
          </a> 
        </span>
      </Container>
    </div>
  );
};

export default Footer;