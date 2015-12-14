import d3 from 'd3';
import React from 'react';
import SVGComponent from './svg-component.js'

var dateFormat = d3.time.format('%d/%m/%Y');

// const BOX_OFFICE = 'Gross (dom.) $';
const BOX_OFFICE = 'today';

export default class Scatter extends SVGComponent {
  static get defaultProps() {
    return {
      data : []
    };
  }
  render() {
    return (<svg height="400" width="595">
      <g ref="x-axis"></g>
      <g ref="y-axis"></g>
      <g ref="scatter"></g>
    </svg>);
  }
  d3render() {
    var scatter = this.selectRef('scatter');

    var xScale = d3.time.scale().range([10, 555]).domain(['01/01/1937', '31/12/2015'].map(dateFormat.parse));
    var yScale = d3.scale.linear().range([350, 10]).domain([0,1e9]);

    var join = scatter.selectAll('.point').data(this.props.data);

    join.enter()
      .append('svg:circle')
      .classed('point', true)
      .attr({
      });

    join.exit().remove();

    console.log(this.props.data[0], xScale.domain());

    join.attr({
      r : 4,
      cx : d => xScale(dateFormat.parse(d.Date)),
      cy : d => yScale(d[BOX_OFFICE]),
      fill : 'red'
    });
  }
}
