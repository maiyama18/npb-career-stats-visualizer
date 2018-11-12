import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { connect } from 'react-redux';

const Graph = () => {
  return (
    <ResponsiveLine 
      data={}
      margin={{
        top: 50,
        bottom: 50,
        left: 50,
        right: 100,
      }}
      xScale={{
        type: 'linear'
      }}
      yScale={{
        type: 'linear'
      }}
      axisBottom={{
        legendOffset: 30
      }}
      axisLeft={{
        legendOffset: -30
      }}
      dotColor='inherit:darker(0.3)'
      dotLabel='y'
      dotLabelYOffset={-10}
      animate={true}
      legends={[
        {
          anchor: 'bottom-right',
          justify: false,
          itemWidth: 80,
        }
      ]}
    />
  );
};

const mapStateToProps = (state) => {
  const { xAxis, yAxis, yType } = state.graph;
  const selected = state.data.selected;

  let data = [];
  selected.forEach(player => {
    return {
      id: player.profile.name
    }
  })
}

export default connect()(Graph);