import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export const CardContext = React.createContext();

const CardContextProvider = ({ children }) => {
    let url = 'http://localhost:8000'
    //STATE
    const [javascriptCards, setJavascriptCards] = useState([]);
    const [reactCards, setReactCards] = useState([]);
    const [expressCards, setExpressCards] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [categoryID, setCategoryID] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [userSearchedCards, setUserSearchedCards] = useState('');
    const [cardData, setCardData] = useState([]);
    const [user, setUser] = useState(null);
    const [displayValue, setDisplayValue] = useState(false); 

    //FUNCTIONS
    //AUTHENTICATION & AUTHORIZATION


    //FUNCTION TO FETCH ALL CARDS===================================
    const getCards = async (setElem, cardCategory) => {
        try {
            const res = await fetch(url+'/cards')
            const data = await res.json()

            let cards = [];
            
            data.forEach(card => {
                if(card.category === cardCategory)
                    cards.push(card)
            })
            setElem(cards)
            console.log(cards)
        } catch (error) {
            console.log(error)
        }
    };

    const getUserSearchedCards = async (search) => {
        if(search.length === 0) {
            return;
        }

        try {
            const res = await fetch(url+`/cards/${search}`);
            const data = await res.json();
            setCardData(data)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    //FUNCTION TO TOGGLE SHOWANSWER================================
    const toggleAnswer = (cardID, elem, setElem) => {
        setElem(elem.map(card => 
            card.id === cardID ? {...card, 
                showAnswer: !card.showAnswer} : card
        ));
    };

    //FUNCTION TO CREATE A CARD=====================================
    const createCard = async (question, answer, category) => {
        try {
        //set up card obj data
        const cardData = {
            question,
            answer,
            category
        };
        //set up post options
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        };
        //make post request
        const res = await fetch(url+'/cards', options);
        if(!res.ok) {
            toast.error('Failed to create card, all fields are required');
            <Toaster />
            return;
        }
        await res.json();
            toast.success('Card created');
            <Toaster />
        } catch (error) {
            toast.error(error);
            <Toaster />
        }
    };

    //FUNCTIONS TO HANDLE INPUT VALUES FOR CREATING A CARD
    const categoryIDChange = (event) => {
        setCategoryID(event.target.value);
    };

    const questionChange = (event) => {
        setQuestion(event.target.value);
    };

    const answerChange = (event) => {
        setAnswer(event.target.value);
    };
    //FUNCTION TO SUBMIT CARD CREATION
    const submit = () => {
        createCard(question, answer, categoryID);
    };

    //DELETE CARD
    const deleteCard = async (cardID, setElem, cardCategory) => {
        console.log(cardID)
        try{
            const res = await fetch(url + `/cards/delete/${cardID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(!res.ok) {
                toast.error('Failed to delete')
                return
            }
            getCards(setElem, cardCategory)
        } catch (error) {
            console.log(error)
        }
    }

    //EDIT CARD
    const editCard = async (cardID, updatedQuestion, updatedAnswer, cardCategory, setElem) => {
        try {
            const cardData = {
                question: updatedQuestion,
                answer: updatedAnswer,
                category: cardCategory
            };

            const res = await fetch(url + `/cards/${cardID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData)
            });

            if (!res.ok) {
                toast.error('Failed to update card');
                return;
            }

            toast.success('Card updated successfully');

            // Refresh the cards after editing
            getCards(setElem, cardCategory);

        } catch (error) {
            console.log(error);
            toast.error('Error updating card');
        }
    }

    //DISPLAYS THE EDIT CARD PAGE
    const displayEditPage = (cardID) => {
        console.log(cardID)
        setDisplayValue(true);
        console.log(displayValue)
    }

    return (
        <CardContext.Provider value={{
            cardData, setCardData,
            getUserSearchedCards, userSearchedCards, setUserSearchedCards,
            submit,
            categoryIDChange, categoryID,
            questionChange, question,
            answerChange, answer,
            createCard, displayEditPage,
            toggleAnswer,
            showAnswer, setShowAnswer,           
            javascriptCards, setJavascriptCards,           
            reactCards, setReactCards,           
            expressCards, setExpressCards,            
            getCards, deleteCard, editCard}}>
            {children}
        </CardContext.Provider>
    )
}

export default CardContextProvider;