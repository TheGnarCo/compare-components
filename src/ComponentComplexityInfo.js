import React from 'react'

import { sizes } from './utils'

export class ComponentComplexityInfo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ display: 'inline-block', width: '500px' }}>
          <h2 style={{ display: 'inline' }}>
            Calculating the {sizes[this.props.componentComplexityIndex]}th prime
          </h2>
        </div>
        <span>
          <button onClick={this.props.increaseComponentComplexity}>
            Increase Component Complexity
          </button>
          <button onClick={this.props.decreaseComponentComplexity}>
            Decrease Component Complexity
          </button>
        </span>
      </div>
    )
  }
}
