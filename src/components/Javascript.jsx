import { useContext, useEffect } from 'react'
import {CardContext} from '../../ContextAPI/ContextProvider'
import { BsFillTrashFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

const Javascript = () => {

  const {
    getCards,
    setJavascriptCards,
    javascriptCards,
    toggleAnswer, deleteCard, displayEditPage     
  } = useContext(CardContext)

  useEffect(() => {
    getCards(setJavascriptCards, 'javascript')
  }, [])


  return (
  <div className='page js'>
    {javascriptCards.map(card => (
      <div key={card.id} className='card'>
        {card.id > 45 ?
          <div className='edit-box' >
            <div className="inner-edit-box">
              <HiPencilAlt className="edit-icon" />
              <BsFillTrashFill className='edit-icon' onClick={() => deleteCard(card.id, setJavascriptCards, 'javascript')} />
            </div>
          </div>
          : null}
        <h2>{card.showAnswer ? card.answer : card.question}</h2>
        <button onClick={() => toggleAnswer(card.id, javascriptCards, setJavascriptCards)} >{card.showAnswer ? 'BACK' : 'ANSWER'}</button>
      </div>
      
    ))}
  </div>
  )
}

export default Javascript
