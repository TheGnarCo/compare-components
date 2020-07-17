import React from 'react'

export const PassingPropsInfo = ({ pass, togglePass }) => (
  <div>
    <div style={{ display: 'inline-block', width: '500px' }}>
      <h2 style={{ display: 'inline' }}>
        Are we changing any props? {pass ? 'Yes' : 'No'}
      </h2>
    </div>
    <span>
      <button onClick={togglePass}>Toggle Prop Mutation</button>
    </span>
  </div>
)
