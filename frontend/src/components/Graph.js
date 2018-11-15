import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { connect } from 'react-redux';
import { makeDataForNivo } from '../utils';

const Graph = (props) => {
  return (
    <ResponsiveLine 
      data={props.data}
      margin={{
        top: 20,
        bottom: 70,
        left: 70,
        right: 110,
      }}
      xScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      axisBottom={{
        legendOffset: 45,
        legend: props.xAxisLabel,
        legendPosition: 'middle',
      }}
      axisLeft={{
        legendOffset: -50,
        legend: props.yAxisLabel,
        legendPosition: 'middle',
      }}
      dotColor='inherit:darker(0.3)'
      dotLabel='y'
      dotLabelYOffset={-10}
      animate={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 100,
          justify: false,
          itemWidth: 80,
          itemHeight: 20,
          symbolSize: 12,
          symbolShape: 'circle',
        },
      ]}
      theme={{
        background: '#f4f4f4',
        axis: {
          legend: {
            text: {
              fontSize: 20,
            },
          },
        },
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const data = makeDataForNivo(state.data.selected, state.graph.xAxis, state.graph.yAxis, state.graph.yearType);

  return {
    xAxisLabel: state.graph.xAxis.text,
    yAxisLabel: state.graph.yAxis.text,
    data,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);