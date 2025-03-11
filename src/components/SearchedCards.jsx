import { useEffect, useContext } from "react"
import { CardContext } from "../../ContextAPI/ContextProvider"
import { BsFillTrashFill } from "react-icons/bs";

const SearchedCards = () => {

    const { 
        cardData,
        setCardData,
        getUserSearchedCards,
        userSearchedCards,
        setUserSearchedCards,
        toggleAnswer
    } = useContext(CardContext)

    useEffect(() => {
      getUserSearchedCards(userSearchedCards)
    }, [])


  return (
    <div className='page searched-cards' >
        {cardData.map(card => (
      <div key={card.id} className='card'>
          <h2>{!card.showAnswer ? card.question : card.answer}{card.id > 40 ? <BsFillTrashFill /> : null}</h2>
          <button onClick={() => toggleAnswer(card.id, cardData, setCardData)} >{!card.showAnswer ? 'ANSWER' : 'BACK'}</button>
      </div>
  ))}
    </div>
  )
}

export default SearchedCards
