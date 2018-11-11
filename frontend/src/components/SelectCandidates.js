import React from 'react';
import { List, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPlayerThunk } from '../redux/modules/select';

const SelectCandidates = ({ candidates, selectPlayerThunk }) => (
  <div>
    <List divided verticalAlign='middle'>
      {candidates.map(candidate => (
        <List.Item key={candidate.id}>
          <List.Content floated='right'>
            <Button onClick={() => selectPlayerThunk(candidate.id)}>Add</Button>
          </List.Content>
          <List.Content style={{height: '100%'}}>
            {candidate.name}({candidate.team})
          </List.Content>
        </List.Item>
      ))}
    </List>
  </div>
);

const mapStateToProps = (state) => ({
  candidates: state.select.candidates,
});
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    selectPlayerThunk,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCandidates);
