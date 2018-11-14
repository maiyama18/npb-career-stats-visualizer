import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

const Header = () => {
  return (
    <Menu attached inverted borderless color='teal'>
      <Container>
        <Menu.Item name='NPB stats visualizer' fitted='horizontally' />
      </Container>
    </Menu>
  );
};

export default Header;