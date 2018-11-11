import React from 'react';
import { List, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const SelectCandidates = ({ candidates }) => (
  <div>
    <List divided verticalAlign='middle'>
      {candidates.map(candidate => (
        <List.Item key={candidate.id}>
          <List.Content floated='right'>
            <Button>Add</Button>
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
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCandidates);
