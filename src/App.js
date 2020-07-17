import React, { useEffect, useState } from 'react'

import { ComponentComplexityInfo } from './ComponentComplexityInfo'
import { ComponentCountInfo } from './ComponentCountInfo'
import { ComponentTypeInfo } from './ComponentTypeInfo'
import { Fsc } from './Fsc'
import { Impure } from './Impure'
import { Memo } from './Memo'
import { PassingPropsInfo } from './PassingPropsInfo'
import { PropCountInfo } from './PropCountInfo'
import { Pure } from './Pure'
import { propArray, safeIncrement, safeDecrement, toggle, sizes } from './utils'

const componentsAndKeys = {
  functional: {
    pure: {
      ComponentToRender: Memo,
      keyPrefix: 'memo',
    },
    impure: {
      ComponentToRender: Fsc,
      keyPrefix: 'fsc',
    },
  },
  classBased: {
    pure: {
      ComponentToRender: Pure,
      keyPrefix: 'pure',
    },
    impure: {
      ComponentToRender: Impure,
      keyPrefix: 'impure',
    },
  },
}
const App = () => {
  const [averageRenderTime, setAverageRenderTime] = useState()
  const [count, setCount] = useState(0)
  const [componentComplexityIndex, setComponentComplexityIndex] = useState(0)
  const [componentCountIndex, setComponentCountIndex] = useState(0)
  const [functional, setFunctional] = useState(false)
  const [pass, setPass] = useState(true)
  const [propCountIndex, setPropCountIndex] = useState(0)
  const [pure, setPure] = useState(false)
  const [renderTimes, setRenderTimes] = useState([])
  const [startRender, setStartRender] = useState()
  const [target, setTarget] = useState(0)
  const [timing, setTiming] = useState(false)

  const renderStuff = () => {
    const prop = pass ? count : 'a'
    const otherProps = propArray[propCountIndex]
    const { ComponentToRender, keyPrefix } = componentsAndKeys[
      functional ? 'functional' : 'classBased'
    ][pure ? 'pure' : 'impure']

    return (
      <div>
        {Array.from(Array(sizes[componentCountIndex]), (_, i) => (
          <ComponentToRender
            key={`${keyPrefix}${i}`}
            prop={prop}
            complexity={sizes[componentComplexityIndex]}
            {...otherProps}
          />
        ))}
      </div>
    )
  }

  const causeRender = () => {
    setCount((current) => current + 1)
    setStartRender(performance.now())
    setTiming(true)
    setAverageRenderTime()
    setRenderTimes([])
    setTarget(count + 2)
  }

  const renderTimingStuff = () =>
    averageRenderTime !== undefined ? (
      <h2>
        {renderTimes.length + 2} renders occurred averaging {averageRenderTime}{' '}
        ms
      </h2>
    ) : null

  useEffect(() => {
    if (timing) {
      const newTiming = performance.now() - startRender
      if (count < target) {
        setCount((current) => current + 1)
        setStartRender(performance.now())
        setTiming(true)
        setRenderTimes((current) => [...current, newTiming])
      } else {
        const timings = [...renderTimes, newTiming]
        const averageRenderTime =
          timings.reduce((sum, n) => sum + n, 0) / timings.length
        setAverageRenderTime(averageRenderTime)
        setTiming(false)
      }
    }
  }, [count, renderTimes, setRenderTimes, startRender, target, timing])

  return (
    <div>
      <ComponentTypeInfo
        pure={pure}
        togglePure={() => setPure(toggle)}
        functional={functional}
        toggleFunctional={() => setFunctional(toggle)}
      />
      <ComponentCountInfo
        componentCountIndex={componentCountIndex}
        decreaseComponentCount={() => setComponentCountIndex(safeDecrement)}
        increaseComponentCount={() => setComponentCountIndex(safeIncrement)}
      />
      <PassingPropsInfo pass={pass} togglePass={() => setPass(toggle)} />
      <PropCountInfo
        decreasePropsPassed={() => setPropCountIndex(safeDecrement)}
        increasePropsPassed={() => setPropCountIndex(safeIncrement)}
        propCountIndex={propCountIndex}
      />
      <ComponentComplexityInfo
        componentComplexityIndex={componentComplexityIndex}
        decreaseComponentComplexity={() =>
          setComponentComplexityIndex(safeDecrement)
        }
        increaseComponentComplexity={() =>
          setComponentComplexityIndex(safeIncrement)
        }
      />
      <button style={{ fontSize: '40px' }} onClick={causeRender}>
        Render
      </button>
      {renderTimingStuff()}
      {renderStuff()}
    </div>
  )
}

export default App
