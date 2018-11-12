import React from 'react';
import { Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeQueryThunk, changeStatsType, statsTypeOptions } from '../redux/modules/data';

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
    query: state.data.query, 
    statsType: state.data.statsType, 
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    changeQueryThunk,
    changeStatsType,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
