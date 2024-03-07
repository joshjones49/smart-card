import { useContext, useEffect } from 'react'
import {CardContext} from '../../ContextAPI/ContextProvider'
import { BsFillTrashFill } from "react-icons/bs";

const ReactCtn = () => {

  const {  
          getCards,
          setReactCards,
          reactCards,
          toggleAnswer 
        } = useContext(CardContext)

    useEffect(() => {
      getCards(setReactCards, 'React')
    }, [])

  return (
    <div className='page react' >
        {reactCards.map(card => (
          <div key={card.id} className='card'>
          <h2>{!card.showAnswer ? card.question : card.answer}{card.id > 40 ? <BsFillTrashFill /> : null}</h2>
          <button onClick={() => toggleAnswer(card.id, reactCards, setReactCards)} >{!card.showAnswer ? 'ANSWER' : 'BACK'}</button>
    </div>
  ))}
    </div>
  )
}

export default ReactCtn
