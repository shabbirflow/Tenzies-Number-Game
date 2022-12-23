import React from 'react'
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from './Confetti'


function App() {
  function generateNewDie() { //to generate a new die object
    let x = Math.ceil(Math.random() * 6)
    // let x = 5
    return {
        value: x,
        isHeld: false,
        id: nanoid()
    }
}
  function allNewDice(){ //function to generate array of 10 random numbers
    let newarr = []
    for(let i = 0; i<10; i++){
        newarr.push(generateNewDie())
    }
    return newarr  }   

  const [dice, setDice] = React.useState(allNewDice()) //dice state array
  let dicefaces = dice.map(x => { //mapping over array elements
    return <Die 
            value = {x.value} 
            key={x.id}
            isHeld={x.isHeld}
            holdDice={() => {
              hold(x.id)
            }}
          />
  })

  function rollDice(){ //roll and get new numbers
    if(!tenzies){
      setDice( prevdice => prevdice.map(die => {
        return die.isHeld ? die : generateNewDie()
    }))
      setRolls(prevrolls => prevrolls + 1)
    }else{
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
    }
    
  }
  
  function hold(id){ //click on dice to hold it
    setDice( prevdice => prevdice.map( x => {
        return x.id === id ?
              {...x, isHeld: !x.isHeld} :
              x
      }))
  }
  const [tenzies, setTenzies] = React.useState(false)//state for winning game
  const [rolls, setRolls] = React.useState(0)
  React.useEffect( //conditions for player winning the game
    ()=> {
      const allHeld = dice.every(x => x.isHeld)
      const firstVal = dice[0].value
      const allSame = dice.every(x => x.value === firstVal)
      if(allHeld && allSame){
          setTenzies(true)
      }
    }, 
    [dice]

  )
  
  return (
    <main className="main">
      {tenzies && <Confetti />}
      <div className="out-square" >
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
            {dicefaces}
        </div>
        <button className='roll-button'  onClick={rollDice}>
        {tenzies ? "New Game" : "Roll Dice"}
        </button>
        <p className='rolls-track'>Number of Rolls :   <span className='roll-num'>{rolls}</span> </p>
      </div>
      </main>
  )
}

export default App
