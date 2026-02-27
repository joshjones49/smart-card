import { CardContext } from "../../ContextAPI/ContextProvider"
import { useContext } from "react"
import toast, { Toaster } from "react-hot-toast"

const CreatorCtn = () => {

    const { 
            categoryIDChange, categoryID,
            questionChange, question,
            answerChange, answer,
            submit,
            canCreate
         } = useContext(CardContext)

  if (!canCreate) {
    return (
      <div className='page creator'>
        <div className='creator-card'>
          <h1>Access denied</h1>
          <p>Please log in as a user or admin to create cards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='page creator' >

      <div className='card-ctn' >

        <div className='creator-card' >
          <h1>Category</h1>
          <textarea placeholder="Javascript, React, Express, etc."
            value={categoryID}
            onChange={categoryIDChange} />
        </div>

        <div className='creator-card' >
          <h1>Question</h1>
          <textarea
            value={question}
            onChange={questionChange} />
        </div>

        <div className='creator-card' >
          <h1>Answer</h1>
          <textarea
          value={answer}
          onChange={answerChange}/>
        </div>

      </div>
      <button className='creator-btn' onClick={() => submit()} >SUBMIT</button>
    </div>
  )
}

export default CreatorCtn
