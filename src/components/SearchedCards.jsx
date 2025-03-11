import { useEffect, useContext } from "react"
import { CardContext } from "../../ContextAPI/ContextProvider"

const SearchedCards = () => {

    const { 
        getUserSearchedCards
    } = useContext(CardContext)

    useEffect(() => {
      getUserSearchedCards()
    }, [])


  return (
    <div className='page searched-cards' >

    </div>
  )
}

export default SearchedCards
