// @flow

import React from 'react'
import Tabs from './tabs'

function App() {
  return (
    <div className="container">

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

    </div>
  )
}

export default App
