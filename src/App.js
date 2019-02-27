import React from 'react';

const propSizes = [1, 10, 50, 100, 250, 500, 750, 1000];
const propArray = propSizes.map(size => {
  const propsOfSize = {};
  for (let i = 0; i < size; i += 1) {
    propsOfSize[`prop${i}`] = i;
  }
  return propsOfSize;
});

class App extends React.Component {
  state = {
    count: 0,
    componentComplexity: 4,
    componentCount: 50,
    functional: true,
    pass: true,
    propCountIndex: 0,
    pure: true,
    startRender: undefined,
    stopRender: undefined,
    timing: false,
  };

  componentDidUpdate() {
    if (this.state.timing) {
      this.setState({
        timing: false,
        stopRender: performance.now(),
      });
    }
  }

  renderStuff = () => {
    const prop = this.state.pass ? this.state.count : "a";
    const otherProps = propArray[this.state.propCountIndex];
    let ComponentToRender;
    let keyPrefix;

    if (this.state.functional) {
      if (this.state.pure) {
        ComponentToRender = Memo;
        keyPrefix = "memo";
      }
      else {
        ComponentToRender = Fst;
        keyPrefix = "fst";
      }
    }
    else {
      if (this.state.pure) {
        ComponentToRender = Pure;
        keyPrefix = "pure";
      }
      else {
        ComponentToRender = Impure;
        keyPrefix = "impure";
      }
    }

    const listItems = [];
    for (let i = 0; i < this.state.componentCount; i += 1) {
      listItems.push(<ComponentToRender
        key={`${keyPrefix}${i}`}
        prop={prop}
        complexity={this.state.componentComplexity}
        {...otherProps}
      />);
    }

    return <div>{listItems}</div>;
  }

  toggleFunctional = () => this.setState({ functional: !this.state.functional });
  togglePass = () => this.setState({ pass: !this.state.pass });
  togglePure = () => this.setState({ pure: !this.state.pure });
  causeRender = () => this.setState({
    count: this.state.count + 1,
    startRender: performance.now(),
    stopRender: undefined,
    timing: true,
  });

  increaseComponentCount = () => this.setState({
    componentCount: this.state.componentCount < 10000
      ? this.state.componentCount + 50
      : this.state.componentCount
    });

  decreaseComponentCount = () => this.setState({
    componentCount: this.state.componentCount > 0
      ? this.state.componentCount - 50
      : this.state.componentCount
    });

  increasePropsPassed = () => this.setState({
    propCountIndex: this.state.propCountIndex < propSizes.length - 1
      ? this.state.propCountIndex + 1
      : this.state.propCountIndex
    });

  decreasePropsPassed = () => this.setState({
    propCountIndex: this.state.propCountIndex > 0
      ? this.state.propCountIndex - 1
      : this.state.propCountIndex
    });

  increaseComponentComplexity = () => this.setState({
    componentComplexity: this.state.componentComplexity < 10000
      ? this.state.componentComplexity + 50
      : this.state.componentComplexity
    });

  decreaseComponentComplexity = () => this.setState({
    componentComplexity: this.state.componentComplexity > 0
      ? this.state.componentComplexity - 50
      : this.state.componentComplexity
    });

  componentHeader = () => {
    let text;
    if (this.state.functional) {
      if (this.state.pure) {
        text = "Memoized FSCs";
      }
      else {
        text = "FSCs";
      }
    }
    else {
      if (this.state.pure) {
        text = "Pure Components";
      }
      else {
        text = "Components";
      }
    }
    return (
      <div style={{ display: "inline-block", width: "500px" }}>
        <h2 style={{ display: "inline" }}>Rendering {`${this.state.componentCount} ${text}`}</h2>
      </div>
    );
  }

  componentTypeStuff = () => (
    <div>
      <span>
        {this.componentHeader()}
        <span>
          <button onClick={this.toggleFunctional}>Toggle Functional</button>
          <button onClick={this.togglePure}>Toggle Pure/Memo</button>
          <button onClick={this.increaseComponentCount}>More Components</button>
          <button onClick={this.decreaseComponentCount}>Less Components</button>
        </span>
      </span>
    </div>
  );

  passingPropsStuff = () => (
    <div>
      <div style={{ display: "inline-block", width: "500px" }}>
        <h2 style={{ display: "inline" }}>Are we changing any props? {this.state.pass ? "Yes" : "No"}</h2>
      </div>
      <span>
        <button onClick={this.togglePass}>Toggle Prop Mutation</button>
      </span>
    </div>
  )

  propCountStuff = () => (
    <div>
      <div style={{ display: "inline-block", width: "500px" }}>
        <h2 style={{ display: "inline" }}>How many props are we passing? {propSizes[this.state.propCountIndex]}</h2>
      </div>
      <span>
        <button onClick={this.increasePropsPassed}>Increase Props Passed</button>
        <button onClick={this.decreasePropsPassed}>Decrease Props Passed</button>
      </span>
    </div>
  )

  componentCountStuff = () => (
    <div>
      <div style={{ display: "inline-block", width: "500px" }}>
        <h2 style={{ display: "inline" }}>How many props are we passing? {propSizes[this.state.propCountIndex]}</h2>
      </div>
      <span>
      </span>
    </div>
  )

  componentComplexityStuff = () => (
    <div>
      <div style={{ display: "inline-block", width: "500px" }}>
        <h2 style={{ display: "inline" }}>Calculating the {this.state.componentComplexity}th prime</h2>
      </div>
      <span>
        <button onClick={this.increaseComponentComplexity}>Increase Component Complexity</button>
        <button onClick={this.decreaseComponentComplexity}>Decrease Component Complexity</button>
      </span>
    </div>
  )

  renderTimingStuff = () => this.state.stopRender
    ? <h2>It took {(this.state.stopRender - this.state.startRender).toPrecision(5)}ms</h2>
    : null;

  render() {
    return (
      <div>
        {this.componentTypeStuff()}
        {this.passingPropsStuff()}
        {this.propCountStuff()}
        {this.componentComplexityStuff()}
        <button style={{ fontSize: "40px" }}onClick={this.causeRender}>Render</button>
        {this.renderTimingStuff()}
        {this.renderStuff()}
      </div>
    );
  }
}

function slowIsPrime(p) {
  let d = 2;
  while (d < p - 1) {
    if (p % d === 0) return false;
    d += 1;
  }
  return true;
}

function calculateNthPrime(n) {
  let p = 2;
  while (n > 1) {
    p += 1;
    if (slowIsPrime(p)) n -= 1;
  }
  return p;
}

class Pure extends React.PureComponent {
  render() {
    const factor = calculateNthPrime(this.props.complexity);
    console.log("render pure");
    return <div>{factor} - {this.props.prop}</div>;
  }
}

class Impure extends React.Component {
  render() {
    const factor = calculateNthPrime(this.props.complexity);
    console.log("render impure");
    return <div>{factor} - {this.props.prop}</div>;
  }
}

const Fst = ({ complexity, prop }) => {
  const factor = calculateNthPrime(complexity);
  console.log("render fst");
  return <div>{factor} - {prop}</div>;
};

const Memo = React.memo(({ complexity, prop }) => {
  const factor = calculateNthPrime(complexity);
  console.log("render memo");
  return <div>{factor} - {prop}</div>;
});

export default App;
