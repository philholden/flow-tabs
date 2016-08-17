// @flow

import React from 'react'
import Fetcher from './fetcher'
import { getGreeting } from '../api'
import man from '../../img/man.png'
import MultiselectDropdown from './multiselect-dropdown'
import Tabs from './tabs'
//import { observer } from 'mobx-react'

export const HelloWorld = () => <div>Hello World.</div>
export const NotUsed = () => <div>Not Used.</div>

function App() {
  return (
    <div className="container">
      <h1>User Report</h1>
      <div className="di-container first">
        <h1>Todos</h1>
        <MultiselectDropdown
          defaultValue={['promise']}
          options={[
            {
              label: 'promise',
              value: 'promise',
            },
            {
              label: 'town',
              value: 'town',
            },
          ]}
        />
        <Tabs
          panes={[
            {
              label: 'hello',
              id: 'one',
              content: <div>moo</div>,
            }, {
              label: 'goodbye',
              id: 'two',
              content: <div>boo</div>,
            },
          ]}
        />
        <div className="row">
          <div className="col-sm-12">
            <div>
              <HelloWorld />
              <img src={man} alt="man" />
              <Fetcher getGreeting={getGreeting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
