import React from 'react'
import Die from "./components/Die"
import {nanoid} from "nanoid"


export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    let diceArr = []
    for (let i = 0; i <10; i++) {
      diceArr.push(
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      )
    }
    console.log(diceArr)
    return diceArr
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElement = dice.map(( num, ind) => {
    return <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
    />
  })
  
  return (
    <main>
      <div className="dice-container">
        {diceElement}
      </div>
      <button
        className='roll--dice'
        onClick={rollDice}
      >
        Roll Dice
      </button>
    </main>
  )
}