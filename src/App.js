import React from 'react'

import { ComponentComplexityInfo } from './ComponentComplexityInfo'
import { ComponentTypeInfo } from './ComponentTypeInfo'
import { Fsc } from './Fsc'
import { Impure } from './Impure'
import { Memo } from './Memo'
import { PassingPropsInfo } from './PassingPropsInfo'
import { PropCountInfo } from './PropCountInfo'
import { Pure } from './Pure'
import { sizes } from './utils'

const propArray = sizes.map(size => {
  const propsOfSize = {}
  for (let i = 0; i < size; i += 1) {
    propsOfSize[`prop${i}`] = i
  }
  return propsOfSize
})

class App extends React.Component {
  state = {
    averageRenderTime: undefined,
    count: 0,
    componentComplexityIndex: 0,
    componentCountIndex: 0,
    functional: false,
    pass: true,
    propCountIndex: 0,
    pure: false,
    renderTimes: [],
    startRender: undefined,
    target: 0,
    timing: false,
  }

  componentDidUpdate() {
    if (this.state.timing) {
      const stopRender = performance.now()
      const renderTime = stopRender - this.state.startRender
      const renderTimes = [...this.state.renderTimes, renderTime]

      if (this.state.count < this.state.target) {
        this.recordRender({ renderTimes })
      } else {
        const averageRenderTime =
          renderTimes.reduce((sum, n) => sum + n, 0) / 10
        this.setState({
          averageRenderTime,
          timing: false,
        })
      }
    }
  }

  renderStuff = () => {
    const prop = this.state.pass ? this.state.count : 'a'
    const otherProps = propArray[this.state.propCountIndex]
    let ComponentToRender
    let keyPrefix

    if (this.state.functional) {
      if (this.state.pure) {
        ComponentToRender = Memo
        keyPrefix = 'memo'
      } else {
        ComponentToRender = Fsc
        keyPrefix = 'fsc'
      }
    } else {
      if (this.state.pure) {
        ComponentToRender = Pure
        keyPrefix = 'pure'
      } else {
        ComponentToRender = Impure
        keyPrefix = 'impure'
      }
    }

    const listItems = []
    for (let i = 0; i < sizes[this.state.componentCountIndex]; i += 1) {
      listItems.push(
        <ComponentToRender
          key={`${keyPrefix}${i}`}
          prop={prop}
          complexity={sizes[this.state.componentComplexityIndex]}
          {...otherProps}
        />,
      )
    }

    return <div>{listItems}</div>
  }

  increaseStateItem = item =>
    this.setState({
      [item]:
        this.state[item] < sizes.length - 1
          ? this.state[item] + 1
          : this.state[item],
    })

  decreaseStateItem = item =>
    this.setState({
      [item]: this.state[item] > 0 ? this.state[item] - 1 : this.state[item],
    })

  increaseComponentCount = () => this.increaseStateItem('componentCountIndex')
  decreaseComponentCount = () => this.decreaseStateItem('componentCountIndex')

  increasePropsPassed = () => this.increaseStateItem('propCountIndex')
  decreasePropsPassed = () => this.decreaseStateItem('propCountIndex')

  increaseComponentComplexity = () =>
    this.increaseStateItem('componentComplexityIndex')
  decreaseComponentComplexity = () =>
    this.decreaseStateItem('componentComplexityIndex')

  toggleFunctional = () => this.setState({ functional: !this.state.functional })
  togglePass = () => this.setState({ pass: !this.state.pass })
  togglePure = () => this.setState({ pure: !this.state.pure })

  causeRender = () =>
    this.recordRender({
      averageRenderTime: undefined,
      count: this.state.count,
      renderTimes: [],
      target: this.state.count + 10,
    })

  recordRender = otherState =>
    this.setState({
      count: this.state.count + 1,
      startRender: performance.now(),
      timing: true,
      ...otherState,
    })

  renderTimingStuff = () =>
    this.state.averageRenderTime ? (
      <h2>It took {this.state.averageRenderTime} ms</h2>
    ) : null

  render() {
    return (
      <div>
        <ComponentTypeInfo
          componentCountIndex={this.state.componentCountIndex}
          decreaseComponentCount={this.decreaseComponentCount}
          functional={this.state.functional}
          increaseComponentCount={this.increaseComponentCount}
          pure={this.state.pure}
          toggleFunctional={this.toggleFunctional}
          togglePure={this.togglePure}
        />
        <PassingPropsInfo pass={this.state.pass} togglePass={this.togglePass} />
        <PropCountInfo
          decreasePropsPassed={this.decreasePropsPassed}
          increasePropsPassed={this.increasePropsPassed}
          propCountIndex={this.state.propCountIndex}
        />
        <ComponentComplexityInfo
          componentComplexityIndex={this.state.componentComplexityIndex}
          decreaseComponentComplexity={this.decreaseComponentComplexity}
          increaseComponentComplexity={this.increaseComponentComplexity}
        />
        <button style={{ fontSize: '40px' }} onClick={this.causeRender}>
          Render
        </button>
        {this.renderTimingStuff()}
        {this.renderStuff()}
      </div>
    )
  }
}

export default App
