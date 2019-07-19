import React, { Component} from "react";
import ReactDOM from "react-dom";
import {hot} from "react-hot-loader";
import "./App.css";
const rsp = require("spockscissorspaper")

const list = ['paper', 'rock', 'scissors', 'lizard', 'spock', 'pen', 'sword']
const emo = ['🧻', '💎', '✂', '🦎', '🖖', '🖋', '🗡']
const ssp = rsp.rspalator()
let go = { w: '', p1: '', p2: '', m: '', e: '', go: false }
let result = {}
let pick = { p1: '', p2: '' }

function App () {
  let p1css = 'show'
  let p2css = 'show'
  if (pick.p1 == '' && pick.p2 == '') { p1css = 'show'; p2css = 'hide' }
  if (pick.p1 != '' && pick.p2 == '') { p1css = 'hide'; p2css = 'show' }
  if (pick.p1 != '' && pick.p2 != '') { p1css = 'show'; p2css = 'hide' }


  return (
    <div>
      <Winner />
      <div id="one" className={p1css}>
      p1
      <Buttons player="one" />
      </div>

      <div id="two" className={p2css}>
      p2
      <Buttons player="two" />
      </div>

    </div>
  )
}

class Welcome extends Component {
  render() {
    return (
      <h2>Wecomes {this.props.name}</h2>
    )
  }
}

function Winner(props) {
  return result.w == 'draw'?
    <h2>{result.m}</h2>:
    <h2>{result.w} Wins! {result.e} {result.m}</h2>
}


function Buttons(props) {
  let b = list.map((i, ix) => {
    return (
      <li key={i} >
        <button onClick={ e => handlePick(i, props.player, e) }>
          {emo[ix]} {i}
        </button>
      </li>
    )
  })
  return (
    <ul id={props.player} >
      {b}
    </ul>
  )

}

function handlePick(i, p, e) {
  if (p == 'one') { pick.p1 = i }
  if (p == 'two') { pick.p2 = i }
  if (pick.p1 != '' && pick.p2 != '') haveAGo()
  ReactDOM.render(<App />, document.getElementById("root"))
}

function haveAGo() {
  result = ssp.haveAGo(pick.p1, pick.p2)
  pick.p1 = ''
  pick.p2 = ''
}

export default hot(module)(App);
