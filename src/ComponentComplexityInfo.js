import React from 'react'

import { sizes } from './utils'

export const ComponentComplexityInfo = ({
  componentComplexityIndex,
  decreaseComponentComplexity,
  increaseComponentComplexity,
}) => (
  <div>
    <div style={{ display: 'inline-block', width: '500px' }}>
      <h2 style={{ display: 'inline' }}>
        Calculating the {sizes[componentComplexityIndex]}th prime
      </h2>
    </div>
    <span>
      <button onClick={increaseComponentComplexity}>
        Increase Component Complexity
      </button>
      <button onClick={decreaseComponentComplexity}>
        Decrease Component Complexity
      </button>
    </span>
  </div>
)
