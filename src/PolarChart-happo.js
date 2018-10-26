import React from 'react';

import PolarChart from './PolarChart';

export default () => (
  <PolarChart
    score={632}
    maxScore={800}
    slices={[
      {
        label: '1',
        value: 5,
        color: 'orange',
      },
      {
        label: '2',
        value: 0,
        color: 'black',
      },
      {
        label: '3',
        value: 5,
        color: 'pink',
      },
      {
        label: '4',
        value: 7,
        color: 'green',
      },
      {
        label: '5',
        value: 10,
        color: 'red',
      },
      {
        label: '6',
        value: 7,
        color: 'blue',
      },
    ]}
  />
);

export const withActiveSlice = () => (
  <PolarChart
    score={77}
    maxScore={200}
    activeSlice={3}
    slices={[
      {
        label: '1',
        value: 8,
        color: 'orange',
      },
      {
        label: '2',
        value: 5,
        color: 'black',
      },
      {
        label: '3',
        value: 5,
        color: 'pink',
      },
      {
        label: '4',
        value: 3,
        color: 'green',
      },
      {
        label: '5',
        value: 7,
        color: 'red',
      },
      {
        label: '6',
        value: 3,
        color: 'blue',
      },
    ]}
  />
);
