// @flow

import React, { Component } from 'react'
import Radium from 'radium'

type CounterPropsType = {
  increment: number,
  color?: string,
}

class Counter extends Component {
  static defaultProps: {};
  state: Object;
  props: CounterPropsType;
  interval: number;

  constructor(props: CounterPropsType) {
    super(props)
    this.state = { counter: 0 }
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment,
    })
  }

  render() {
    return (
      <h1 style={[[{ color: 'green' }], [{ color: this.props.color }], [[{color: 'pink'}]]]}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    )
  }
}

export default Radium(Counter)
