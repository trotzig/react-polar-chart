import React from 'react';

const SIZE = 100;
const RAD_CIRCUMFERENCE = Math.PI * 2;
const CENTER = SIZE / 2;
const RADIUS = CENTER - (CENTER / 8); // padding to prevent clipping
const MIN_SLICE_SIZE = CENTER * 0.07;
const NUMBER_OF_INDICATING_CIRCLES = 5;

function renderPaths({ slices, onSliceSelected, activeSlice }) {
  const slicePercentage = 1 / slices.length;
  let highestValue = 0;
  slices.forEach(({ value }) => {
    highestValue = Math.max(highestValue, value);
  });

  const radSegment = slicePercentage * RAD_CIRCUMFERENCE;
  const x = Math.cos(radSegment) * RADIUS;
  const y = Math.sin(radSegment) * RADIUS;

  return slices.map((slice, index) => {
    const { color, value } = slice;
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
    let opacity = 0.9;
    if (typeof activeSlice !== 'undefined') {
      if (index === activeSlice) {
        opacity = 1;
      } else {
        opacity = 0.5;
      }
    }
    return (
      <path
        d={d}
        fill={color}
        key={index}
        transform={[
          `translate(${translate} ${translate})`,
          `scale(${relValue})`,
          `rotate(${index * slicePercentage * 360} ${CENTER} ${CENTER})`,
        ].join(' ')}
        onClick={() => onSliceSelected(slice, index)}
        style={{
          opacity,
        }}
      />
    );
  });
}

export default function PolarChart({ maxScore, score, slices, activeSlice, onSliceSelected }) {
  const gap = CENTER / (NUMBER_OF_INDICATING_CIRCLES + 1);
  const degPerSlice = 360 / slices.length;
  return (
    <div className="PolarChart">
      <div className="PolarChart-inner">
        <style>{`
          .PolarChart {
            position: relative;
            padding-top: 100%;
          }
          .PolarChart-inner {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .PolarChart path {
            cursor: pointer;
          }
          .PolarChart path:hover {
            opacity: 1 !important;
          }
          .PolarChart-innerCircle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: #fff;
            height: 20%;
            width: 20%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: ${SIZE / 4}px;
            font-weight: 500;
            line-height: 1;
            text-align: center;
          }
          .PolarChart-innerCircle span {
            font-size: ${SIZE / 9}px;
            opacity: 0.5;
            display: block;
            line-height: 1;
          }
          .PolarChart-label {
            height: 50%;
            position: absolute;
            left: 50%;
            top: 0;
            transform-origin: bottom center;
            font-weight: bold;
            width: 0;
          }
        `}</style>
        {slices.map((slice, i) => {
          const { label, color } = slice;
          const deg = (360 * (i / slices.length)) - (degPerSlice / 2);
          let opacity = 1;
          if (typeof activeSlice !== 'undefined' && i !== activeSlice) {
            opacity = 0.5;
          }
          return (
            <div
              className="PolarChart-label"
              style={{
                color,
                transform: `rotate(${deg}deg)`,
              }}
            >
              <div
                style={{
                  transform: `translateX(-50%) rotate(${360 - deg}deg)`,
                  cursor: 'pointer',
                  opacity,
                }}
                onClick={() => onSliceSelected(slice, i)}
              >
                {label}
              </div>
            </div>
          );
        })}
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
            {renderPaths({ slices, onSliceSelected, activeSlice })}
          </g>
          {[...Array(NUMBER_OF_INDICATING_CIRCLES)].map((_, index) => (
            <circle
              key={index}
              cx={CENTER}
              cy={CENTER}
              r={(gap / 2) + (gap * (index + 1))}
              stroke="#fff"
              strokeWidth="0.8"
              fill="none"
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </svg>
        <div
          className="PolarChart-innerCircle"
          onClick={() => onSliceSelected(undefined, undefined)}
        >
          <div>
            {score}
            <span>
              /{maxScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
