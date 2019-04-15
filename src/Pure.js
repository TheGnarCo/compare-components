import React from 'react'

import { calculateNthPrime } from './utils'

export class Pure extends React.PureComponent {
  render() {
    const factor = calculateNthPrime(this.props.complexity)
    console.debug('render pure')
    return (
      <div>
        {factor} - {this.props.prop}
      </div>
    )
  }
}
