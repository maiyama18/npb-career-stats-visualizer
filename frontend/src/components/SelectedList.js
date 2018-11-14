import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Icon, Loader, Header } from 'semantic-ui-react';
import { removeSelectedPlayer } from '../redux/modules/data';
import { teamKanjis } from '../utils';

const SelectedList = (props) => (
  <div>
    <Header as='h6'>
      表示中
    </Header>
    <List divided>
      {props.selected.map(player => (
        <List.Item key={player.profile.id}>
          <List.Content floated='right'>
            <a href='/' onClick={e => { e.preventDefault(); props.removeSelectedPlayer(player.profile.id); }}>
              <Icon name='minus square' />
            </a>
          </List.Content>
          <List.Content>
            {player.profile.name}
            {player.profile.team === 'UNDEFINED' ? null : ` (${teamKanjis[player.profile.team]})`}
          </List.Content>
        </List.Item>
      ))}
      <Loader active={props.selecting} inline='centered' />
    </List>
  </div>
);

const mapStateToProps = (state) => ({
  selecting: state.data.selecting,
  selected: state.data.selected,
});
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    removeSelectedPlayer,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedList);