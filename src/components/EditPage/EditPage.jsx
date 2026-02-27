import './EditPage.css'

import { useContext } from 'react'

const EditPage = () => {

    const { 
        getCards,
        setExpressCards,
        expressCards,
        toggleAnswer, deleteCard, displayEditPage
      } = useContext(CardContext)

  return (
    <div className='edit-page page'>
      <h1>EDIT PAGE</h1>
    </div>
  )
}

export default EditPage
