import React from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'semantic-ui-react';

const SelectedList = ({ selected }) => (
  <div>
    <List divided verticalAlign='middle'>
      {selected.map(player => (
        <List.Item key={player.id}>
          <List.Content floated='right'>
            <Button>Remove</Button>
          </List.Content>
          <List.Content>
            {player.profile.name}({player.profile.team})
          </List.Content>
        </List.Item>
      ))}
    </List>
  </div>
);

const mapStateToProps = (state) => ({
  selected: state.select.selected,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedList);
