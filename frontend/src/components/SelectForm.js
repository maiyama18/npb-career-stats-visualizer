import React from 'react';
import { Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeQueryThunk } from '../redux/modules/select';

const SelectForm = ({ query, changeQueryThunk }) => (
  <div>
    <Form>
      <Form.Field>
        <input 
          type="text" 
          placeholder='選手名で検索'
          value={query}
          onChange={e => changeQueryThunk(e.target.value)}
        />
      </Form.Field>
    </Form>
  </div>
);

const mapStateToProps = (state) => ({
  query: state.select.query, 
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    changeQueryThunk,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
