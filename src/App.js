import React, { Component } from 'react';
import PolarChart from './PolarChart';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ width: 400, margin: '0 auto' }}>
          <PolarChart
            slices={[
              {
                value: 5,
                color: 'yellow',
              },
              {
                value: 0,
                color: 'black',
              },
              {
                value: 5,
                color: 'pink',
              },
              {
                value: 7,
                color: 'green',
              },
              {
                value: 10,
                color: 'red',
              },
              {
                value: 7,
                color: 'blue',
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
