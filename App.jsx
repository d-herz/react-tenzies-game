import React from 'react'
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti/'


export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false) 

  //Win condition logic checked everytime [dice] changes
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstVal = dice[0].value;
    const allSameVal = dice.every( die => die.value === firstVal)

    if (allSameVal && allHeld) {
      setTenzies(true)
      console.log("Winnnn")
    }
  }, [dice])

  //helper function 
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

  //CB for button press event:
  function rollDice() {

    if (!tenzies) {
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ?
            die :
            generateNewDie()
        })
      })
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  //function to pass down to each die element
  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ?
          { ...die, isHeld: !die.isHeld } :
          die
      })
    })
  }

  //Mapping the "dice" array (from state) and returning a component for each
  const diceElement = dice.map(( num, ind) => {
    return <Die
      key={num.id}
      id={num.id}
      value={num.value}
      isHeld={num.isHeld}
      toggleHold={holdDice}
    />
  })

  const buttonText = tenzies ? "New Game" : "Roll";
  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button
        className='roll--dice'
        onClick={rollDice}
      >
        {buttonText}
      </button>
    </main>
  )
}