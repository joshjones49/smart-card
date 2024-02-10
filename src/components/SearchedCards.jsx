import { useEffect, useContext } from "react"
import { CardContext } from "../../ContextAPI/ContextProvider"

const SearchedCards = () => {

    const { getUserSearchedCards, userSearchedCards } = useContext(CardContext)


  return (
    <div className='searched-cards' >
      <h1>SEARCHED CARDS</h1>
    </div>
  )
}

export default SearchedCards
