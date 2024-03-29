import React from 'react'
import { useContext, useEffect } from 'react'
import { CardContext } from '../../ContextAPI/ContextProvider'
import { BsFillTrashFill } from "react-icons/bs";

const ExpressCtn = () => {

  const { 
          getCards,
          setExpressCards,
          expressCards,
          toggleAnswer
        } = useContext(CardContext)

    useEffect(() => {
      getCards(setExpressCards, 'Express')
    }, [])

  return (
    <div className='page express' >
      {expressCards.map(card => (
      <div key={card.id} className='card'>
      <h2>{!card.showAnswer ? card.question : card.answer}{card.id > 40 ? <BsFillTrashFill /> : null}</h2>
      <button onClick={() => toggleAnswer(card.id, expressCards, setExpressCards)} >{!card.showAnswer ? 'ANSWER' : 'BACK'}</button>
    </div>
  ))}
  
    </div>
  )
}

export default ExpressCtn
