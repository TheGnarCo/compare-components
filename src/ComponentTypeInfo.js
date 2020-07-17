import React from 'react'

export const ComponentTypeInfo = ({
  functional,
  pure,
  toggleFunctional,
  togglePure,
}) => {
  let text
  if (functional) {
    text = pure ? 'Memoized FSCs' : 'FSCs'
  } else {
    text = pure ? 'Pure Components' : '"Regular" Class Components'
  }

  return (
    <div>
      <span>
        <div style={{ display: 'inline-block', width: '500px' }}>
          <h2 style={{ display: 'inline' }}>Rendering {text}</h2>
        </div>
        <span>
          <button onClick={toggleFunctional}>Toggle Functional</button>
          <button onClick={togglePure}>Toggle Pure/Memo</button>
        </span>
      </span>
    </div>
  )
}
