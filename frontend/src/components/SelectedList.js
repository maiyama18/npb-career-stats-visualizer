import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Button } from 'semantic-ui-react';
import { removeSelectedPlayer } from '../redux/modules/select';

const SelectedList = ({ selected, removeSelectedPlayer }) => (
  <div>
    <List divided verticalAlign='middle'>
      {selected.map(player => (
        <List.Item key={player.profile.id}>
          <List.Content floated='right'>
            <Button onClick={() => removeSelectedPlayer(player.profile.id)}>Remove</Button>
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
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    removeSelectedPlayer,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedList);