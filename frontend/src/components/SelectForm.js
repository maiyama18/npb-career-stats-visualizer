import React from 'react';
import { Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeQueryThunk, changeStatsType } from '../redux/modules/select';

const statsTypeOptions = [
  { key: 'b', text: '打撃成績', value: 'batting' },
  { key: 'p', text: '投球成績', value: 'pitching' },
];

const SelectForm = (props) => (
  <Form>
    <Form.Field>
      <Form.Select 
        options={statsTypeOptions} 
        value={props.statsType}
        onChange={(_e, data) => props.changeStatsType(data.value)}
      />
    </Form.Field>
    <Form.Field>
      <input 
        type="text" 
        placeholder='選手名で検索'
        value={props.query}
        onChange={e => props.changeQueryThunk(e.target.value)}
      />
    </Form.Field>
  </Form>
);

const mapStateToProps = (state) => {
  return {
    query: state.select.query, 
    statsType: state.select.statsType, 
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    changeQueryThunk,
    changeStatsType,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
