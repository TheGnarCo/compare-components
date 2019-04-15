import React from 'react'

import { sizes } from './utils'

export class PropCountInfo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ display: 'inline-block', width: '500px' }}>
          <h2 style={{ display: 'inline' }}>
            How many props are we passing? {sizes[this.props.propCountIndex]}
          </h2>
        </div>
        <span>
          <button onClick={this.props.increasePropsPassed}>
            Increase Props Passed
          </button>
          <button onClick={this.props.decreasePropsPassed}>
            Decrease Props Passed
          </button>
        </span>
      </div>
    )
  }
}
