import { useEffect, useContext } from "react"
import { CardContext } from "../../ContextAPI/ContextProvider"

const SearchedCards = () => {

    const { } = useContext(CardContext)


  return (
    <div className='searched-cards' >
      <h2>SEARCHED CARDS</h2>
    </div>
  )
}

export default SearchedCards
