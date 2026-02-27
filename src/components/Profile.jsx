import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../ContextAPI/ContextProvider';

const Profile = () => {
  const { isLoggedIn, user, myCards, fetchMe, fetchMyCards } = useContext(CardContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMe();
      fetchMyCards();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="page profile-page">
        <div className="profile-card">
          <h1>Profile</h1>
          <p>You need to log in to view your profile.</p>
          <Link className="creator-btn" to="/login-register">Go to Login / Register</Link>
        </div>
      </div>
    );
  }

  const groupedCards = myCards.reduce((acc, card) => {
    const category = card.category || 'uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(card);
    return acc;
  }, {});

  return (
    <div className="page profile-page">
      <div className="profile-card">
        <h1>{user?.name || user?.username}</h1>
        <p>Username: <span>{user?.username}</span></p>
        <p>Access: <span>{user?.access}</span></p>
      </div>

      <div className="profile-sections">
        {Object.keys(groupedCards).length === 0 ? (
          <div className="profile-category">
            <h2>No cards created yet</h2>
          </div>
        ) : (
          Object.entries(groupedCards).map(([category, cards]) => (
            <section className="profile-category" key={category}>
              <h2>{category.toUpperCase()} ({cards.length})</h2>
              {cards.map((card) => (
                <div key={card.id} className="profile-card-item">
                  <h3>{card.question}</h3>
                  <p>{card.answer}</p>
                </div>
              ))}
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
