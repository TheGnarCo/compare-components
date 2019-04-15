import React from 'react'

import { sizes } from './utils'

export class ComponentTypeInfo extends React.Component {
  componentHeader = () => {
    let text
    if (this.props.functional) {
      if (this.props.pure) {
        text = 'Memoized FSCs'
      } else {
        text = 'FSCs'
      }
    } else {
      if (this.props.pure) {
        text = 'Pure Components'
      } else {
        text = 'Components'
      }
    }
    return (
      <div style={{ display: 'inline-block', width: '500px' }}>
        <h2 style={{ display: 'inline' }}>
          Rendering {`${sizes[this.props.componentCountIndex]} ${text}`}
        </h2>
      </div>
    )
  }

  render() {
    return (
      <div>
        <span>
          {this.componentHeader()}
          <span>
            <button onClick={this.props.toggleFunctional}>
              Toggle Functional
            </button>
            <button onClick={this.props.togglePure}>Toggle Pure/Memo</button>
            <button onClick={this.props.increaseComponentCount}>
              More Components
            </button>
            <button onClick={this.props.decreaseComponentCount}>
              Fewer Components
            </button>
          </span>
        </span>
      </div>
    )
  }
}
