import { useContext, useEffect } from 'react'
import {CardContext} from '../../ContextAPI/ContextProvider'

const Javascript = () => {

  const {
          getCards,
          setJavascriptCards,
          javascriptCards,
          toggleAnswer     
        } = useContext(CardContext)

  useEffect(() => {
    getCards(setJavascriptCards, 'Javascript')
  }, [])


  return (
    <div className='page js'>
  {javascriptCards.map(card => (
    <div key={card.id} className='card'>
      <h2>{!card.showAnswer ? card.question : card.answer}</h2>
      <button onClick={() => toggleAnswer(card.id, javascriptCards, setJavascriptCards)} >{!card.showAnswer ? 'ANSWER' : 'BACK'}</button>
    </div>
  ))}

</div>
  )
}

export default Javascript
