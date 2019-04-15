import React from 'react'

export class PassingPropsInfo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ display: 'inline-block', width: '500px' }}>
          <h2 style={{ display: 'inline' }}>
            Are we changing any props? {this.props.pass ? 'Yes' : 'No'}
          </h2>
        </div>
        <span>
          <button onClick={this.props.togglePass}>Toggle Prop Mutation</button>
        </span>
      </div>
    )
  }
}
