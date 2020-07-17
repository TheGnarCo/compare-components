import React from 'react'

import { sizes } from './utils'

export const PropCountInfo = ({
  decreasePropsPassed,
  increasePropsPassed,
  propCountIndex,
}) => (
  <div>
    <div style={{ display: 'inline-block', width: '500px' }}>
      <h2 style={{ display: 'inline' }}>
        How many props are we passing? {sizes[propCountIndex]}
      </h2>
    </div>
    <span>
      <button onClick={increasePropsPassed}>Increase Props Passed</button>
      <button onClick={decreasePropsPassed}>Decrease Props Passed</button>
    </span>
  </div>
)
