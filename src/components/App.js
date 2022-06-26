import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
import imageError from "../images/auth/error.svg";
import imageSuccess from "../images/auth/success.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res.data) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getAllData()
        .then(([cards, res]) => {
          setCurrentUser(res);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((currentUser) => currentUser._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (newInfo) => {
    api
      .setUser(newInfo.name, newInfo.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateAvatar = (newAvatar) => {
    api
      .setAvatar(newAvatar.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleRegister(registerData) {
    auth
      .registration(registerData)
      .then(() => {
        setInfoTooltipImage(imageSuccess);
        setMessage("Вы успешно зарегистрировались!");
        setInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setInfoTooltipImage(imageError);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  //Вход пользователя
  function handleLogin(loginData) {
    auth
      .authorization(loginData)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
        }
      })
      .catch((err) => {
        setInfoTooltipImage(imageError);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
          />

          <Route exact path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route exact path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          message={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
