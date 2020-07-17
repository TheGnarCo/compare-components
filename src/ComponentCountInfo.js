import React from 'react'

import { sizes } from './utils'

export const ComponentCountInfo = ({
  componentCountIndex,
  decreaseComponentCount,
  increaseComponentCount,
}) => {
  return (
    <div>
      <span>
        <div style={{ display: 'inline-block', width: '500px' }}>
          <h2 style={{ display: 'inline' }}>
            Rendering {`${sizes[componentCountIndex]} components`}
          </h2>
        </div>
        <span>
          <button onClick={increaseComponentCount}>More Components</button>
          <button onClick={decreaseComponentCount}>Fewer Components</button>
        </span>
      </span>
    </div>
  )
}
