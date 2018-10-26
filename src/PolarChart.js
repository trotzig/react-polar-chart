import React from 'react';

const SIZE = 100;
const RAD_CIRCUMFERENCE = Math.PI * 2;
const CENTER = SIZE / 2;
const RADIUS = CENTER - 1; // padding to prevent clipping
const MIN_SLICE_SIZE = CENTER * 0.07;


export default class PolarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPaths() {
    const { slices } = this.props;
    const { highlighted } = this.state;
    const total = slices.reduce((totalValue, { value }) => totalValue + value, 0);
    const slicePercentage = 1 / slices.length;
    let highestValue = 0;
    slices.forEach(({ value }) => {
      highestValue = Math.max(highestValue, value);
    });

    const radSegment = slicePercentage * RAD_CIRCUMFERENCE;
    const x = Math.cos(radSegment) * RADIUS;
    const y = Math.sin(radSegment) * RADIUS;

    return slices.map(({ color, value }, index) => {
      // d is a string that describes the path of the slice.
      // The weirdly placed minus signs [eg, (-(lastY))] are due to the fact
      // that our calculations are for a graph with positive Y values going up,
      // but on the screen positive Y values go down.
      const d = [
        `M ${CENTER},${CENTER}`,
        `l ${RADIUS},0`,
        `a${RADIUS},${RADIUS}`,
        '0',
        `0,0`,
        `${x - RADIUS},${-y}`,
        'z',
      ].join(' ');


      const relValue = (value + MIN_SLICE_SIZE) / (highestValue + MIN_SLICE_SIZE);
      const translate = (1 - relValue) * 50;
      let opacity = 1;
      if (typeof highlighted !== 'undefined' && highlighted !== index) {
        opacity = 0.5;
      }
      return (
        <path
          d={d}
          fill={color}
          key={index}
          transform={[
            `translate(${translate} ${translate})`,
            `scale(${relValue})`,
            `rotate(${index * slicePercentage * 360} ${SIZE/2} ${SIZE/2})`,
          ].join(' ')}
          onClick={() => { this.setState({ highlighted: index }) }}
          style={{
            opacity,
          }}
        />
      );
    });
  }
  render() {
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
            {this.renderPaths()}
          </g>
          <circle cx={CENTER} cy={CENTER} r="40" stroke="#fff" strokeWidth="1" fill="none" />
          <circle cx={CENTER} cy={CENTER} r="30" stroke="#fff" strokeWidth="1" fill="none" />
          <circle cx={CENTER} cy={CENTER} r="20" stroke="#fff" strokeWidth="1" fill="none" />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            backgroundColor: '#fff',
            height: '20%',
            width: '20%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          632
        </div>
      </div>
    );
  }
}
