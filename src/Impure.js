import React from 'react'

import { calculateNthPrime } from './utils'

export class Impure extends React.Component {
  render() {
    const factor = calculateNthPrime(this.props.complexity)
    console.debug('render impure')
    return (
      <div>
        {factor} - {this.props.prop}
      </div>
    )
  }
}
