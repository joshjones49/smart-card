import { useEffect, useContext } from "react"
import { CardContext } from "../../ContextAPI/ContextProvider"

const SearchedCards = () => {

    const { 
        getUserSearchedCards,
        userSearchedCards,
        setUserSearchedCards
    } = useContext(CardContext)

    useEffect(() => {
      getUserSearchedCards(userSearchedCards)
    }, [])


  return (
    <div className='page searched-cards' >

    </div>
  )
}

export default SearchedCards
