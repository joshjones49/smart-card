import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
export const CardContext = React.createContext();

const CardContextProvider = ({ children }) => {
    const url = 'http://localhost:8000';
    const TOKEN_KEY = 'smartcard_access_token';
    const USER_KEY = 'smartcard_user';

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
    const [accessToken, setAccessToken] = useState('');
    const [myCards, setMyCards] = useState([]);
    const [displayValue, setDisplayValue] = useState(false); 

    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (savedToken && savedUser) {
            setAccessToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const saveSession = (sessionUser, token) => {
        setUser(sessionUser);
        setAccessToken(token);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    };

    const clearSession = () => {
        setUser(null);
        setAccessToken('');
        setMyCards([]);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    };

    const getAuthHeaders = () => {
        if (!accessToken) return {};
        return { Authorization: `Bearer ${accessToken}` };
    };

    const isGuest = !user;
    const isAdmin = user?.access === 'admin';
    const canCreate = user?.access === 'user' || user?.access === 'admin';
    const isLoggedIn = Boolean(user && accessToken);

    const canManageCard = (card) => {
        if (!user) return false;
        if (user.access === 'admin') return true;
        return card.owner_id === user.id;
    };

    //AUTHENTICATION & AUTHORIZATION
    const register = async ({ name, username, password }) => {
        try {
            const registerRes = await fetch(url + '/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, password })
            });

            if (!registerRes.ok) {
                const message = await registerRes.text();
                toast.error(message || 'Register failed');
                return false;
            }

            toast.success('Registered successfully');
            return await login({ username, password });
        } catch (error) {
            toast.error('Register failed');
            return false;
        }
    };

    const login = async ({ username, password }) => {
        try {
            const loginRes = await fetch(url + '/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await loginRes.json().catch(() => null);

            if (!loginRes.ok || !data?.accessToken) {
                toast.error(data?.message || data?.error || 'Login failed');
                return false;
            }

            saveSession(
                {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    access: data.access
                },
                data.accessToken
            );
            toast.success('Logged in');
            return true;
        } catch (error) {
            toast.error('Login failed');
            return false;
        }
    };

    const logout = () => {
        clearSession();
        toast.success('Logged out');
    };

    const fetchMe = async () => {
        if (!accessToken) return null;
        try {
            const res = await fetch(url + '/users/me', {
                headers: {
                    ...getAuthHeaders()
                }
            });

            if (!res.ok) {
                clearSession();
                return null;
            }

            const data = await res.json();
            setUser(data);
            localStorage.setItem(USER_KEY, JSON.stringify(data));
            return data;
        } catch (error) {
            clearSession();
            return null;
        }
    };

    const fetchMyCards = async () => {
        if (!accessToken) return [];
        try {
            const res = await fetch(url + '/users/me/cards', {
                headers: {
                    ...getAuthHeaders()
                }
            });

            if (!res.ok) {
                return [];
            }
            const data = await res.json();
            setMyCards(data);
            return data;
        } catch (error) {
            return [];
        }
    };


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
        if (!canCreate) {
            toast.error('You must be logged in as user/admin to create cards');
            return;
        }

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
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(cardData)
        };
        //make post request
        const res = await fetch(url+'/cards', options);
        if(!res.ok) {
            toast.error('Failed to create card, all fields are required');
            return;
        }
        await res.json();
            toast.success('Card created');
        } catch (error) {
            toast.error(error);
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
        try{
            const res = await fetch(url + `/cards/delete/${cardID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                }
            })
            if(!res.ok) {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Failed to delete');
                return
            }
            if (typeof setElem === 'function' && cardCategory) {
                getCards(setElem, cardCategory);
            } else if (userSearchedCards.trim().length > 0) {
                getUserSearchedCards(userSearchedCards);
            }
            fetchMyCards();
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

            const res = await fetch(url + `/cards/edit/${cardID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
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
            fetchMyCards();

        } catch (error) {
            console.log(error);
            toast.error('Error updating card');
        }
    }

    //DISPLAYS THE EDIT CARD PAGE
    const displayEditPage = (cardID) => {
        setDisplayValue(true);
    }

    return (
        <CardContext.Provider value={{
            // auth
            user,
            accessToken,
            isGuest,
            isAdmin,
            canCreate,
            isLoggedIn,
            canManageCard,
            login,
            register,
            logout,
            fetchMe,
            fetchMyCards,
            myCards,
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