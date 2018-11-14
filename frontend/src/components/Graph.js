import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { connect } from 'react-redux';

const Graph = (props) => {
  return (
    <ResponsiveLine 
      data={props.data}
      margin={{
        top: 30,
        bottom: 60,
        left: 60,
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
        legendOffset: 35,
        legend: props.xAxis,
        legendPosition: 'middle',
        symbolSize: 30,
      }}
      axisLeft={{
        legendOffset: -40,
        legend: props.yAxis,
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