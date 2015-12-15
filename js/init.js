'use strict';

import d3 from 'd3';
import React from 'react';
import { Im, parseNumerics, connectMap }
  from './utilities.js';

import colours from './econ_colours.js';

import Header from './header.js';
import ChartContainer from './chart-container.js';
import ScatterRaw from './disney_scatter.js';

import chroma from 'chroma-js';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import { updateData } from './actions.js';
import updateState from './reducers.js'

var store = createStore(updateState);

var Scatter = connectMap({
  data : 'data'
})(ScatterRaw);

class Chart extends ChartContainer {
  render() {
    return(
      <div className='chart-container'>
        <Header title="Disney" subtitle="Movies!"/>
        <Scatter />
      </div>
    );
  }
}
var props = {
  height : 320
};

var chart = React.render(
  <Provider store={store}>
    {() => <Chart {...props} />}
  </Provider>, document.getElementById('interactive'));


var dateFormat = d3.time.format('%d/%m/%Y');

d3.csv('./data/disney.csv', function(error, data) {
  data = data.map(parseNumerics);
  data = data.map(d => {
    return Im.extend(d, {
      date : dateFormat.parse(d.Date)
    });
  }).sort((a,b) => { return a.date - b.date; })
  .filter(d => d.today > 0);
  store.dispatch(updateData(data));
});
