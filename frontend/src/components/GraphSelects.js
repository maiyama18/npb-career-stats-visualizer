import React from 'react';
import { Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { 
  changeXAxis, changeYAxis, changeYType,
  xAxisOptions, battingYAxisOptions, pitchingYAxisOptions, yTypeOptions,
} from '../redux/modules/graph';
import { connect } from 'react-redux';

const Graph = (props) => {
  return (
    <Form>
      <Form.Group>
        <Form.Field style={{ marginRight: '3rem' }}>
          <label>横軸</label>
          <Form.Select 
            options={xAxisOptions} 
            value={props.xAxis}
            onChange={(_e, data) => props.changeXAxis(data.value)}
            style={{ minWidth: '7em' }}
          />
        </Form.Field>
        <Form.Field>
          <label>縦軸</label>
          <Form.Select 
            options={yTypeOptions} 
            value={props.yType}
            onChange={(_e, data) => props.changeYType(data.value)}
            style={{ minWidth: '7em' }}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: 'white' }}>_</label>
          <Form.Select 
            options={props.statsType === 'batting' ? battingYAxisOptions : pitchingYAxisOptions} 
            value={props.yAxis}
            onChange={(_e, data) => props.changeYAxis(data.value)}
            style={{ minWidth: '10em' }}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  xAxis: state.graph.xAxis,
  yAxis: state.graph.yAxis,
  yType: state.graph.yType,
  statsType: state.data.statsType,
});
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    changeXAxis,
    changeYAxis,
    changeYType,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);