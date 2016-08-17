// @flow

import React, { Component } from 'react'
import {StyleSheet, css} from 'aphrodite'

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
    } = this.props
    const styles = StyleSheet.create({
      red: {
        color: '#xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16))
      }
    })

    window.styles = styles

    return (
      <div className="di dropdown open">
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
            <ul
              className="dropdown-menu"
              role="menu"
              aria-labelledby="dLabel2"
              ref={ul => { if (ul) this.ul = ul}}
              onClick={() => this.innerClick = true}
            >
              <input
                className={css(styles.red)}
                onChange={this.onChangeFilter}
              />

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
                    <li key={option.value}>
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
          : false
        }
      </div>
    )
  }
}

document.registerElement('my-app', MultiselectDropdown);
