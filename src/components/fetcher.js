// @flow

import React, { Component } from 'react'

type AppPropsType = {
  getGreeting: () => Promise<{ greeting: string }>,
}

type StatePropsType = {
  greeting: string
}

export default class Fetcher extends Component {
  props: AppPropsType;
  state: StatePropsType = {
    greeting: '',
  };

  onSubmit = (e: Event): void => {
    e.preventDefault()
    this.setState({ greeting: '...loading' })
    this.props.getGreeting()
      .then(data => this.setState(data))
      .catch((err: Error) => this.setState({ greeting: err.message }))
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <button>Get greeting</button>
        <h1>{this.state.greeting}</h1>
      </form>
    )
  }
}
