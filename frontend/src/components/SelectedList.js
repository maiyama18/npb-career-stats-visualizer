import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Icon } from 'semantic-ui-react';
import { removeSelectedPlayer } from '../redux/modules/data';

const SelectedList = ({ selected, removeSelectedPlayer }) => (
  <div>
    <List divided>
      {selected.map(player => (
        <List.Item key={player.profile.id}>
          <List.Content floated='right'>
            <a onClick={() => removeSelectedPlayer(player.profile.id)}>
              <Icon name='minus square' />
            </a>
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
  selected: state.data.selected,
});
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    removeSelectedPlayer,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedList);