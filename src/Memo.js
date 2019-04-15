import React from 'react'

import { calculateNthPrime } from './utils'

export const Memo = React.memo(({ complexity, prop }) => {
  const factor = calculateNthPrime(complexity)
  console.debug('render memo')
  return (
    <div>
      {factor} - {prop}
    </div>
  )
})
