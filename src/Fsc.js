import React from 'react'

import { calculateNthPrime } from './utils'

export const Fsc = ({ complexity, prop }) => {
  const factor = calculateNthPrime(complexity)
  console.debug('render fsc')
  return (
    <div>
      {factor} - {prop}
    </div>
  )
}
