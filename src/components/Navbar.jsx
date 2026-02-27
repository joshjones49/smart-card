import { TbCardsFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { CardContext } from "../../ContextAPI/ContextProvider";
import toast from "react-hot-toast"

const Navbar = () => {
  const navigate = useNavigate();

  const { 
    getUserSearchedCards,
    userSearchedCards,
    setUserSearchedCards,
    canCreate,
    isLoggedIn,
    logout
} = useContext(CardContext)

  const handleSearch = () => {
    if (userSearchedCards.trim().length === 0) {
      toast.error('Error: Field must contain a search term');
      return;
    }

    getUserSearchedCards(userSearchedCards.trim());
    navigate('/searched-cards');
  };

  return (
    <div className='navbar' >
        <Link to='/'>
        <TbCardsFilled className="logo" />
        </Link>

        <div className="searchbar" >
          <input
            id="search-input"
            type="text"
            placeholder="Search"
            value={userSearchedCards}
            onChange={(e) => setUserSearchedCards(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <FaSearch className="searchicon" onClick={handleSearch} />
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

        {canCreate ? (
          <Link to='/creator' className="links" >
            <h1>Create</h1>
          </Link>
        ) : null}

        {isLoggedIn ? (
          <>
            <Link to='/profile' className="links" >
              <h1>Profile</h1>
            </Link>
            <button className="links logout-link" onClick={logout}>
              LOGOUT
            </button>
          </>
        ) : null}
    </div>
  )
  
}

export default Navbar
