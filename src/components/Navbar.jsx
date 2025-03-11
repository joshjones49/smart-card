import { TbCardsFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { CardContext } from "../../ContextAPI/ContextProvider";
import toast, { Toaster } from "react-hot-toast"

const Navbar = () => {

  const { 
    getUserSearchedCards,
    userSearchedCards,
    setUserSearchedCards
} = useContext(CardContext)

  return (
    <div className='navbar' >
        <Link to='/'>
        <TbCardsFilled className="logo" />
        </Link>

        <div className="searchbar" >
          <input id="search-input" type="text" placeholder="Search" onChange={(e) => setUserSearchedCards(e.target.value)}/>
          <Link to='/searched-cards' onClick={() => userSearchedCards.length === 0 ? toast.error('Error: Field must contain a search term') : getUserSearchedCards(userSearchedCards)} >
            <FaSearch className="searchicon" />
          </Link>
        </div>

        <Link to='/javascript-cards' className="links">
          <h1>JS</h1>
        </Link>

        <Link to='/react-cards' className="links" >
          <h1>React</h1>
        </Link>

        <Link to='/express-cards' className="links" >
          <h1>Express</h1>
        </Link>

        <Link to='/creator' className="links" >
          <h1>Create</h1>
        </Link>
    </div>
  )
  
}

export default Navbar
