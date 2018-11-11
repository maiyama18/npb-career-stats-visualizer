import React from 'react';
import { Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeQuery } from '../redux/modules/select';

const SelectForm = ({ query, changeQuery }) => (
  <div>
    <Form>
      <Form.Field>
        <input 
          type="text" 
          placeholder='選手名で検索'
          value={query}
          onChange={e => changeQuery(e.target.value)}
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
    changeQuery,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
