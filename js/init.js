'use strict';

import d3 from 'd3';
import React from 'react';
import { Im, parseNumerics, connectMap }
  from './utilities.js';

import colours from './econ_colours.js';

import Header from './header.js';
import Footer from './footer.js';
import ChartContainer from './chart-container.js';
import ToggleBarRaw from './toggle-bar.js';
import ScatterRaw from './disney_scatter.js';

import chroma from 'chroma-js';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import { updateData, updateFilter } from './actions.js';
import updateState from './reducers.js'

var store = createStore(updateState);

var Scatter = connectMap({
  data : 'data',
  filter : 'filter'
})(ScatterRaw);
var ToggleBar = connectMap({
  value : 'filter'
})(ToggleBarRaw);

class Chart extends ChartContainer {
  render() {
    var toggleProps = {
      items : [
        { title : 'All', key : 'all', value : 'all' },
        { title : 'Traditional animation', key : 'A', value : 'A' },
        { title : 'Live action', key : 'L', value : 'L' },
        { title : 'Hybrid', key : 'H', value : 'H' },
        { title : 'Computer animation', key : 'C', value : 'C' },
      ],
      action : v => { store.dispatch(updateFilter(v)); }
    };

    var footerProps = {
      sources : ['Box Office Mojo', 'IMDB'],
      notes : (
        <div className="note">*Films taking above $10m</div>
      )
    }

    return(
      <div className='chart-container'>
        <Header title="Eight decades of Disney" subtitle="US box-office revenues*" subsub="2015 prices, $bn"/>
        <ToggleBar {...toggleProps} />
        <Scatter />
        <Footer {...footerProps} />
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
  .filter(d => d.today > 1e7);
  store.dispatch(updateData(data));
});
