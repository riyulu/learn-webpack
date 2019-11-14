'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import imgURL from './img/test4.png'
import '../../common/index'
import { a } from './tree-shaking'
import largeNumber from 'large-number'

class Search extends React.Component {

  constructor() {
    super(...arguments)

    this.state = {
      Text: null
    }
  }

  loadComponment() {
    import('./text').then(Text => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    const funA = a()
    const count = largeNumber('999', '1')
    return <div className="text">
      <p>{funA}Search Text{count}</p>
      <img src={imgURL} onClick={this.loadComponment.bind(this)}/>
    </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)