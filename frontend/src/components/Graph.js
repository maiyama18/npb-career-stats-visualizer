import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { connect } from 'react-redux';

const Graph = (props) => {
  return (
    <ResponsiveLine 
      data={props.data}
      margin={{
        top: 50,
        bottom: 50,
        left: 50,
        right: 100,
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
        legendOffset: 30,
        legend: props.xAxis,
      }}
      axisLeft={{
        legendOffset: -30,
        legend: props.yAxis,
      }}
      dotColor='inherit:darker(0.3)'
      dotLabel='y'
      dotLabelYOffset={-10}
      animate={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          itemWidth: 80,
          itemHeight: 20,
        },
      ]}
    />
  );
};

const mapStateToProps = (state) => {
  const { xAxis, yAxis, yType } = state.graph;
  const selected = state.data.selected;

  let data = selected.map(player => {
    return {
      id: player.profile.name,
      data: player.stats.map(year => ({
        x: year[xAxis],
        y: year[yAxis],
      })),
    };
  });
  if (yType === 'cumulative') {
    data = data.map(player => {
      let sum = 0;
      return {
        ...player,
        data: player.data.map(year => {
          sum += year.y;
          return {
            ...year,
            y: sum,
          };
        }),
      };
    });
  }

  return {
    xAxis,
    yAxis,
    data,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);