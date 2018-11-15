import React from 'react';
import { Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { 
  changeXAxis, changeYAxis, changeYearType,
  xAxisOptions, battingYAxisOptions, pitchingYAxisOptions, yearTypeOptions,
} from '../redux/modules/graph';
import { connect } from 'react-redux';
import { retrieveOptionFromValue } from '../utils';

const Graph = (props) => {
  return (
    <Form>
      <Form.Group>
        <Form.Field style={{ marginRight: '3rem' }}>
          <label>横軸</label>
          <Form.Select 
            options={xAxisOptions} 
            value={props.xAxis.value}
            onChange={(_e, data) => props.changeXAxis(retrieveOptionFromValue(data.value, 'xAxis'))}
            style={{ minWidth: '7em' }}
          />
        </Form.Field>
        <Form.Field>
          <label>縦軸</label>
          <Form.Select 
            options={yearTypeOptions} 
            value={props.yearType.value}
            onChange={(_e, data) => props.changeYearType(retrieveOptionFromValue(data.value, 'yearType'))}
            style={{ minWidth: '7em' }}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: 'white' }}>_</label>
          <Form.Select 
            options={props.yAxisOptions} 
            value={props.yAxis.value}
            onChange={(_e, data) => props.changeYAxis(retrieveOptionFromValue(data.value, props.statsType))}
            style={{ minWidth: '10em' }}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = (state) => {
  const { xAxis, yAxis, yearType } = state.graph;
  const { statsType } = state.data;

  const yAxisOptionsAll = (statsType === 'batting') ? battingYAxisOptions : pitchingYAxisOptions;
  const yAxisOptions = (yearType.value === 'each') ? yAxisOptionsAll : yAxisOptionsAll.filter(o => !o.eachYearOnly);

  return {
    xAxis,
    yAxis,
    yearType,
    statsType,
    yAxisOptions,
  };
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    changeXAxis,
    changeYAxis,
    changeYearType,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);