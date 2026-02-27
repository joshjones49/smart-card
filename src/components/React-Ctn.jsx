import { useContext, useEffect } from 'react'
import {CardContext} from '../../ContextAPI/ContextProvider'
import { BsFillTrashFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

const ReactCtn = () => {

  const {  
    getCards,
    setReactCards,
    reactCards,
    toggleAnswer,
    deleteCard, displayEditPage 
  } = useContext(CardContext)

    useEffect(() => {
      getCards(setReactCards, 'react')
    }, [])

  return (
    <div className='page react' >
        {reactCards.map(card => (
          <div key={card.id} className='card'>
            {card.id > 45 ?
              <div className='edit-box' >
                <div className="inner-edit-box">
                  <HiPencilAlt className="edit-icon" onClick={() => displayEditPage(card.id)}/>
                  <BsFillTrashFill className='edit-icon' onClick={() => deleteCard(card.id, setReactCards, 'react')} />
                </div>
              </div>
              : null}
            <h2>{card.showAnswer ? card.answer : card.question}</h2>
            <button onClick={() => toggleAnswer(card.id, reactCards, setReactCards)} >{card.showAnswer ? 'BACK' : 'ANSWER'}</button>
          </div>
          ))}
    </div>
  )
}

export default ReactCtn
