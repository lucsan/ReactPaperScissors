import React, { Component} from "react";
import ReactDOM from "react-dom";
import {hot} from "react-hot-loader";
import "./App.css";


import "./bootstrap-4.3.1-dist/css/bootstrap-grid.min.css"
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css"

const rsp = require("spockscissorspaper")
const ssp = rsp.rspalator()
const list = [
  { paper: '🧻' },
  { rock: '💎' },
  { scissors: '✂' },
  { lizard: '🦎' },
  { spock: '🖖' },
  { pen: '🖋' },
  { sword: '🗡' }
]

let play = { p1: '', p2: '', p1emo: '🎩', p2emo: '🥾', whosChoice: undefined }


function App () {
  play.whosChoice = playerOnesChoice
  return (
    <div id="app" className="container">
      <Preamble />
      <Menu />
      <Arena />
      <Footnote />
    </div>
  )
}

const Arena = () => { return <div id="arena" ><Welcome /></div> }

const Welcome = () => {
  play.p1 = ''
  play.p2 = ''
  play.whosChoice = playerOnesChoice
  return (
    <div id="welcome">
      <h3>welcome</h3>
      <p>🖖 🧻 ✂</p>
      <p>Spock Paper Scissors</p>
      <p>💎 🦎 🖋</p>
      <button onClick={e => renderArena(<PlayerOne />)} >🎲 Ready Player One?</button>
      <p>A game like Rock Paper Scissors, but with more, so much more, like ...</p>
      <p>Spock, a nimble lizard, and guest staring a pen, plus magically, a sword</p>
      <p></p>
      <p></p>
    </div>
  )

}

const Choices = (player) => {
  return (
    <div key={player.player}>
      <ul key="choices"><Buttons player={player.player} /></ul>
    </div>
  )
}

const Buttons = (props) => {
  return list.map((i, ix) => {
    const k = Object.keys(i)[0]
    return (
      <li key={k}>
      <Button
        choice={k}
        emo={i[k]}
        player={props.player}
      />
      </li>
    )
  })
}

const Button = (props) => {
  return (
    <button
      key={props.choice}
      id={props.choice}
      title={props.choice}
      onClick={e => play.whosChoice(props)}
      className="player"
    >
      {props.emo}
    </button>
  )
}

const playerOnesChoice = (props) => {
  play.p1 = props.choice
  play.whosChoice = playerTwosChoice
  renderArena(<ReadyPlayerTwo />)
}

const playerTwosChoice = (props) => {
  play.p2 = props.choice
  play.whosChoice = playerOnesChoice
  renderArena(<Outcome />)
}

const ReadyPlayerTwo = () => {
  return (
    <div id="ready-player-two">
    <button>💪 Make the computor do it (challenge the computor)</button>
    <div>Are you ready?</div>
    <button onClick={e => renderArena(<PlayerTwo />)}>🎲 GO {play.p2emo} player Two</button>
    </div>
  )

}

const PlayerOne = () => {
  return (
    <div id="playerOne">
      <h3>{play.p1emo} Player One</h3>
      <Choices player="one" />
    </div>
  )
}



const PlayerTwo = () => {
  return (
    <div id="player-two">
    <div>{play.p2emo} Play away Player two</div>
    <div>
      <Choices player="two" />
    </div>

    </div>


  )
}

const Outcome = () => {
  let result = ssp.haveAGo(play.p1, play.p2)
  let winner = play.p1 == result.w? 'one': 'two'
  let winnerEmo = play.p1 == result.w? play.p1emo: play.p2emo

  let winningEmo = list.filter(i => Object.keys(i)[0] == result.w)
console.log(winningEmo[0][result.w])
  console.log(play,result)
  return (
    <div id="outcome">

      <div>

      <div>Outcome</div>
      <div>winner {winnerEmo} {winningEmo[0][result.w]} </div>
      <div>Player {winner} with {result.w}</div>
      <div>{result.m}</div>
      <div>{result.e}</div>
      <div></div>
      <div></div>
      <div></div>

      </div>

      <button onClick={e => render(<PlayerOne />, "arena")}>
        Go Again 🖖 💎 🗡
      </button>

    </div>
  )
}




const Footnote = () => {
  return <div id="footnote" >footnote</div>
}

const Preamble = () => {
  return (
    <div id="preamble" className="preamble" >
      <h3><span>🖖 🧻 ✂</span> <span>Spock Paper Scissors</span> <span>💎 🦎 🖋</span></h3>
    </div>
  )
}

const Menu = () => {
  return (
    <div id="menu" className="menu" title="Mini menu Hamburger">
      <h3 onClick={e => toggleMenu()}>🍔</h3>
      <ul id="menu-list" className="flex-column hide" >
        <li className="nav-item" onClick={e => renderArena(<Welcome />)} >Restart</li>
        <li className="nav-item" onClick={e => renderArena(<Hamburger />)} >Have a 🍔 Hamburger</li>
      </ul>
    </div>
  )
}

const toggleMenu = () => {
  let ml = document.getElementById('menu-list')
  if(ml.classList.contains('hide')) {
    ml.classList.remove('hide')
    ml.classList.add('nav')
  } else {
    ml.classList.add('hide')
    ml.classList.remove('nav')
  }
}

const Hamburger = () => {
  return (
    <div id="hamburger" >
      <div>🍔</div>
      <p>Here is a hamburger for you</p>
      <button onClick={e => renderArena(<Welcome />)}>play Spock Sicssors Paper</button>
    </div>
  )
}

const renderApp = (cmpt) => { return render(cmpt, "app") }
const renderArena = (cmpt) => { return render(cmpt, "arena") }

const render = (cmpt, eId) => {
  return ReactDOM.render(cmpt, document.getElementById(eId))
}

export default hot(module)(App)
