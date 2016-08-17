// @flow

import React, { Component } from 'react'

type OptionsType = {
  value: string,
  label: string,
}

type MultiselectDropdownPropsType = {
  onChange: (value: Array<string>) => void,
  onChangeFilter: (value: string) => void,
  options: Array<OptionsType>,
  value: Array<string>,
  defaultValue?: Array<string>,
  name: string,
  nonSelectedText: string,
}

export default class MultiselectDropdown extends Component {
  state = {
    isOpen: false,
    filter: '',
  };

  innerClick:boolean = false;
  filterFn = () => true;

  props: MultiselectDropdownPropsType;

  static defaultProps = {
    onChange: () => {},
    onChangeFilter: x => x,
  };

  onDocumentClick = () => {
    if (this.innerClick) {
      this.innerClick = false
      return
    }
    this.setState({ isOpen: false })
    document.removeEventListener('click', this.onDocumentClick)
  }

  onComponentWillUnmount = () => {
    document.removeEventListener('click', this.onDocumentClick)
  }

  onButtonClick = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false })
    } else {
      document.addEventListener('click', this.onDocumentClick)
      this.setState({ isOpen: true })
    }
  }

  onCheck = ({ target }: Event) => {
    if (
      !(target instanceof HTMLInputElement) ||
      target != null
    ) return
    const { onChange } = this.props
    const nextValue = [
      ...target.parentNode.parentNode.parentNode.querySelectorAll('input'),
    ]
    .filter(input => input.checked)
    .map(input => input.value)
    if (target.checked) {
      onChange([...nextValue, target.value])
    } else {
      onChange(nextValue)
    }
  }

  onChangeFilter = ({ target }: Event) => {
    console.log(this.filterFn)
    if (
      !(target instanceof HTMLInputElement) ||
      target === null
    ) return
    this.setState({ filter: target.value })
    // this.filterFn = target.value === '' ?
    //   () => true :
    //   googlish(target.value)
  }

  render() {
    const {
      options,
      value,
      defaultValue,
      name,
      nonSelectedText = 'none',
      onGray,
    } = this.props

    const wrapperClasses = 'di dropdown open' + (onGray ? ' on-gray' : '') 

    return (
      <div className={wrapperClasses}>
        <button
          className="toggle"
          id="dLabel2"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
          title="Select One ..."
          onClick={this.onButtonClick}
        >
          <span className="ddlabel">
            {nonSelectedText}
          </span>
          <span className="caret" />
        </button>
        {
          this.state.isOpen ?
            <div
              role="menu"
              ref={ul => { if (ul) this.ul = ul}}
              onClick={() => this.innerClick = true}
              style={styles.dropdown}
            >
              <div className="form-group-sm" style={styles.searchWrapper}>
                <input
                  className="form-control"
                  placeholder="Search"
                  onChange={this.onChangeFilter}
                />
              </div>
              <ul style={styles.ul}>
                {
                  options
                    .filter(({ label }) =>
                      label.substr(0, this.state.filter.length) === this.state.filter)
                    .map((option) => {
                    const inputProps = {
                      type: 'checkbox',
                      value: option.value,
                      className: 'sm',
                      name,
                      onChange: this.onCheck,
                    }

                    if (value instanceof Array) {
                      inputProps.checked =
                        value.includes(option.value)
                    } else if (defaultValue instanceof Array) {
                      inputProps.defaultChecked =
                        defaultValue.includes(option.value)
                    }
                    return (
                      <li key={option.value} style={styles.li}>
                        <label className="di-checkbox">
                          <input {...inputProps} />
                          <span className="lbl sm">
                            {option.label}
                          </span>
                        </label>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          : false
        }
      </div>
    )
  }
}

const styles = {
  dropdown: {
    position: 'absolute',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.45)',
    background: 'white',
    zIndex: 1,
  },
  searchWrapper: {
    padding: 14,
    borderBottom: '1px solid #ccc',
  },
  ul: {
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 5,
  },
  li: {
    margin: 0,
    padding: 8,
    listStyle: 'none',
    whiteSpace: 'nowrap',
  }
}
