import React, { Component } from 'react';
import PolarChart from './PolarChart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props) ;
    this.state = { activeSlice: undefined };
  }
  render() {
    const { activeSlice } = this.state;
    return (
      <div className="App">
        <div style={{ width: 400, margin: '0 auto' }}>
          <PolarChart
            score={632}
            maxScore={800}
            activeSlice={activeSlice}
            onSliceSelected={(slice, index) => this.setState({ activeSlice: index })}
            slices={[
              {
                label: '1',
                value: 0.5,
                color: 'orange',
              },
              {
                label: '2',
                value: 0,
                color: 'black',
              },
              {
                label: '3',
                value: 0.5,
                color: 'pink',
              },
              {
                label: '4',
                value: 0.7,
                color: 'green',
              },
              {
                label: '5',
                value: 1,
                color: 'red',
              },
              {
                label: '6',
                value: 0.7,
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
