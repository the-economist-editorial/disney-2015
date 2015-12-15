import d3 from 'd3';
import React from 'react';
import chroma from 'chroma-js';
import colours from './econ_colours.js';
import SVGComponent from './svg-component.js';
import { generateTranslateString } from './utilities.js';

var dateFormat = d3.time.format('%d/%m/%Y');

window.chroma = chroma;

// const BOX_OFFICE = 'Gross (dom.) $';
const BOX_OFFICE = 'today';
const DATE = 'date';
const TYPE = 'Type';

function typeColour(d) {
  switch(d[TYPE]) {
    case 'A':
      return colours.blue[0];
    case 'L':
      return colours.red[0];
    case 'H':
      return colours.green[0];
    default:
      return colours.yellow[0];
  };
}

export default class Scatter extends SVGComponent {
  static get defaultProps() {
    return {
      data : [],
      xRange : [20, 500],
      yRange : [350, 10]
    };
  }
  render() {
    var [x1, x2] = this.props.xRange;
    var [y2, y1] = this.props.yRange;

    return (<svg height="400" width="595">
      <polygon className='backdrop' points={`${x1},${y1} ${x1},${y2} ${x2},${y2} ${x2},${y1}`} />
      <g ref="x-axis"></g>
      <g ref="y-rules" className="rules"></g>
      <g ref="y-axis"></g>
      <g ref="scatter"></g>
      <g ref="voronoi"></g>
    </svg>);
  }
  d3render() {
    var [x1, x2] = this.props.xRange;
    var [y2, y1] = this.props.yRange;

    var xScale = d3.time.scale().range(this.props.xRange).domain(['01/01/1937', '31/12/2015'].map(dateFormat.parse));
    var yScale = d3.scale.linear().range(this.props.yRange).domain([0,7e8]);

    var xAxis = d3.svg.axis()
      .outerTickSize(0)
      .scale(xScale);
    var xAxisLayer = this.selectRef('x-axis')
      .attr({
        'transform' : generateTranslateString(0,y2)
      })
      .call(xAxis);

    var yAxis = d3.svg.axis()
      .outerTickSize(0)
      .orient('right')
      .scale(yScale);
    var yAxisLayer = this.selectRef('y-axis')
      .attr({
        transform : generateTranslateString(x2,0)
      })
      .call(yAxis);

    var yRules = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(x1 - x2)
      .orient('right')
      .tickFormat(d => '')
      .scale(yScale);
    var yRuleLayer = this.selectRef('y-rules')
      .attr({
        transform : generateTranslateString(x2,0)
      })
      .call(yRules);


    var scatterLayer = this.selectRef('scatter');

    var scatterJoin = scatterLayer.selectAll('.point').data(this.props.data);
    scatterJoin.enter()
      .append('svg:circle')
      .classed('point', true)
      .attr({
        cx : d => xScale(d[DATE]),
        cy : yScale.range()[0],
        fill : 'white',
        'stroke-width' : 1,
        'fill-opacity' : 0.6,
        opacity : 0
      });
    scatterJoin.exit().remove();
    scatterJoin.transition().duration(350).delay(d => (xScale(d[DATE]) - x1) * 8).ease('cubic-out').attr({
      r : 3,
      cx : d => xScale(d[DATE]),
      cy : d => yScale(d[BOX_OFFICE]),
      stroke : typeColour,
      fill : typeColour,
      opacity : 1
    });

    // time for the voronoi covering
    var voronoiLayer = this.selectRef('voronoi');
    var voronoi = d3.geom.voronoi()
      .x(d => xScale(d[DATE]))
      .y(d => yScale(d[BOX_OFFICE]))
      .clipExtent([[x1,y1],[x2,y2]]);

    var voronoiJoin = voronoiLayer.selectAll('.voronoi')
      .data(voronoi(this.props.data));

    // voronoiJoin.enter()
    //   .append('svg:path')
    //   .classed('voronoi', true);
    // voronoiJoin.exit().remove();
    // voronoiJoin.attr({
    //   d : d => d ? `M${d.join('L')}Z` : null
    // });
  }
}
