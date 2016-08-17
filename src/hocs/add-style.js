import { mapProps } from 'recompose'

export const addStyle = styles => mapProps(props => ({
  ...props,
  style: [styles, props.style],
}))
