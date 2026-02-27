import React from 'react'
import { useContext, useEffect } from 'react'
import { CardContext } from '../../ContextAPI/ContextProvider'
import { BsFillTrashFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

const ExpressCtn = () => {

  const { 
    getCards,
    setExpressCards,
    expressCards,
    toggleAnswer, deleteCard, displayEditPage, canManageCard
  } = useContext(CardContext)

    useEffect(() => {
      getCards(setExpressCards, 'express')
    }, [])

  return (
    <div className='page express' >
      {expressCards.map(card => (
      <div key={card.id} className='card'>
        {canManageCard(card) ?
          <div className='edit-box' >
            <div className="inner-edit-box">
              <HiPencilAlt className="edit-icon" onClick={() => displayEditPage(card.id)} />
              <BsFillTrashFill className='edit-icon' onClick={() => deleteCard(card.id, setExpressCards, 'express')} />
            </div>
          </div>
          : null}
        <h2>{card.showAnswer ? card.answer : card.question}</h2>
      <button onClick={() => toggleAnswer(card.id, expressCards, setExpressCards)} >{card.showAnswer ? 'BACK' : 'ANSWER'}</button>
    </div>
  ))}
  
    </div>
  )
}

export default ExpressCtn
