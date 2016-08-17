import React, { Component } from 'react'

type PaneType = {
  id: string,
  label: string,
  content: React.Element,
}

type TabsPropsType = {
  panes: Array<PaneType>,
}

type TabsStateType = {
  selected: string,
}

export default class Tabs extends Component {
  static defaultProps: {};
  state: TabsStateType;
  props: TabsPropsType;

  constructor(props: TabsPropsType) {
    super(props)
    this.state = {
      selected: props.panes[0].id,
    }
  }

  render() {
    const { panes } = this.props
    const { selected } = this.state
    return (
      <div className="tab-container">
        <ul className="nav nav-tabs" role="tablist">
          {
            panes.map(({ label, id }) => (
              <li
                role="presentation"
                className={selected === id ? 'active' : ''}
              >
                <a
                  href="#"
                  key={`label-${id}`}
                  id={`label-${id}`}
                  role="tab"
                  aria-controls="home"
                  aria-expanded={selected === id ? 'true' : 'false'}
                  onClick={(e: Event) => {
                    e.preventDefault()
                    this.setState({ selected: id })
                  }}
                >
                  {label}
                </a>
              </li>
            ))
          }
        </ul>
        <div className="tab-content">
          {
            panes
              .filter(({ id }) => id === selected)
              .map(({ content, id }) => (
                <div
                  role="tabpanel"
                  className="tab-pane fade active in"
                  aria-labelledby={`label-${id}`}
                  key={`content-${id}`}
                >
                  {content}
                </div>
              ))
          }
        </div>
      </div>
    )
  }
}
