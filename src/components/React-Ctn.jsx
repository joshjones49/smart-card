import { useContext, useEffect } from 'react'
import {CardContext} from '../../ContextAPI/ContextProvider'

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
          <h2>{!card.showAnswer ? card.question : card.answer}</h2>
          <button onClick={() => toggleAnswer(card.id, reactCards, setReactCards)} >{!card.showAnswer ? 'ANSWER' : 'BACK'}</button>
    </div>
  ))}
    </div>
  )
}

export default ReactCtn
