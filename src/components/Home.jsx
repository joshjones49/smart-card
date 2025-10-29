import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='page home' >
      <h1>Welcome to Smart<span>Card</span>!</h1>
      <p>
        Click on any of the categories on the <span>Navigation Bar</span> to get started with reviewing our smart cards.
      </p>
      <p>
        If you want to create your own smart cards you must be logged in first, then click <span>Create</span>.
      </p>

      <div className="footer">
        <Link to='/login-register'>LOG-IN / REGISTER</Link>
      </div>
    </div>
  )
}

export default Home
