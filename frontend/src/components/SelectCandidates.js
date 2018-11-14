import React from 'react';
import { List, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPlayerThunk } from '../redux/modules/data';

const SelectCandidates = ({ candidates, selectPlayerThunk }) => (
  <div>
    <Header as='h6'>
      検索結果
    </Header>
    <List divided relaxed>
      {candidates.map(candidate => (
        <List.Item key={candidate.id}>
          <List.Content floated='right'>
            <a href='/' onClick={e => { e.preventDefault(); selectPlayerThunk(candidate.id); }}>
              <Icon name='plus square' />
            </a>
          </List.Content>
          <List.Content>
            {candidate.name}({candidate.team})
          </List.Content>
        </List.Item>
      ))}
    </List>
  </div>
);

const mapStateToProps = (state) => ({
  candidates: state.data.candidates,
});
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    selectPlayerThunk,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCandidates);
