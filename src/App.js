import React, { Component} from "react";
import ReactDOM from "react-dom";
import {hot} from "react-hot-loader";
import "./App.css";
const rsp = require("spockscissorspaper")

const list = ['paper', 'rock', 'scissors', 'lizard', 'spock', 'pen', 'sword']
const emos = ['🧻', '💎', '✂', '🦎', '🖖', '🖋', '🗡']
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
    <div id="app">
      <Winner />
      <div id="one" className={p1css}>
        <h3>Player One choose your weapon</h3>
        <Buttons player="one" />
      </div>

      <div id="two" className={p2css}>
        <h3>Player Two choose your weapon</h3>
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
  if (result.w == undefined) return <div></div>
  return result.w == 'draw'?
    <div><h2>{result.emo} {result.m}</h2></div>:
    <div><h2>{result.emo} {result.w} Wins!</h2><div> {result.e} {result.m}</div></div>
}

function Buttons(props) {
  let b = list.map((i, ix) => {
    return (
      <li key={i} >
        {Button(props.player, i, ix)}
      </li>
    )
  })
  return (
    <ul id={props.player} className="button" >
      {b}
    </ul>
  )
}

function Button(player, item, idx) {
  return (
    <button
      onClick={ e => handlePick(item, player, e) }
      title={item}
      >
      {emos[idx]}
    </button>
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
  result.emo = result.w == 'draw'?
    emos[list.indexOf(pick.p1)]:
    emos[list.indexOf(result.w)]
  pick.p1 = ''
  pick.p2 = ''
}

export default hot(module)(App);
