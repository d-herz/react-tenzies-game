import React from 'react'
import Die from "./components/Die"
import {nanoid} from "nanoid"


export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  //helper function added to DRY code after rollDice() had to utilize the same code from allNewDice()
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }


  //Creates a 10 element integer array randomly populated with numbers 1-6 
  function allNewDice() {
    let diceArr = []
    for (let i = 0; i <10; i++) {
      diceArr.push(generateNewDie())
    }
    return diceArr
  }

  //CB for button press event: calls setState(), checks old value (of state dice array) so we can see if any are being "held", if held, keep that die, otherwise return a new die.  Added helper function "generateNewDie()" so we did not have to repeat the same object definition
  function rollDice() {
    // setDice(allNewDice())
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      })
    })
  }

  //function to pass down to each die element, passing in the parameter as ID. This allows us to avoide "derived state"
  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ?
          { ...die, isHeld: !die.isHeld } :
          die
      })
    })
  }

  //Mapping the "dice" array (from state) and returning a component for each element with the proper props
  const diceElement = dice.map(( num, ind) => {
    return <Die
      key={num.id}
      id={num.id}
      value={num.value}
      isHeld={num.isHeld}
      toggleHold={holdDice}
    />
  })
  
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button
        className='roll--dice'
        onClick={rollDice}
      >
        Roll
      </button>
    </main>
  )
}