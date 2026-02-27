import { useEffect, useContext } from "react"
import { CardContext } from "../../ContextAPI/ContextProvider"
import { BsFillTrashFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

const SearchedCards = () => {

    const { 
    cardData,
    setCardData,
    getUserSearchedCards,
    userSearchedCards,
    toggleAnswer, deleteCard, editCard
  } = useContext(CardContext)

    useEffect(() => {
      getUserSearchedCards(userSearchedCards)
    }, [])


  return (
    <div className='page searched-cards' >
        {cardData.map(card => (
      <div key={card.id} className='card'>
            <h2>{card.showAnswer ? card.answer : card.question}{card.id > 45 ?
              <div className="edit-box">
                <BsFillTrashFill className='trashcan' onClick={() => deleteCard(card.id, getUserSearchedCards, 'react')} />
                <HiPencilAlt className="edit-icon" />
              </div>: null}
            </h2>
          <button onClick={() => toggleAnswer(card.id, cardData, setCardData)} >{card.showAnswer ? 'BACK' : 'ANSWER'}</button>
      </div>
  ))}
    </div>
  )
}

export default SearchedCards
