import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  id: 0,
  username: '',
  getUsername: () => {},
  favourites: () =>{},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [favourites, setFavourites] = useState(0);
  const [id, setId] = useState(0);

  const cookieName = 'Authorization-Cookie';

  const[cookie,setCookie,removeCookie] = useCookies([cookieName]);


  const userIsLoggedIn = !!token;

  const loginHandler = (token, username, id) => {
    setCookie(cookieName,token);
    setToken(token);
    setCookie("user", id);
    setUsername(username);
    console.log(token);
    // getFavouritesHandler();
  };

  const logoutHandler = () => {
    removeCookie(cookieName);
    setToken(null);
    setUsername("");
    setFavourites(0);
  };

  const getUsernameHandler = () => {
    let username = null;
    
  }
   
  const getFavouritesHandler = () =>{
    let favourites ;
    fetch(`http://localhost:8081/api/users/${id}/favourites`,{
      method: 'GET',
      credentials: "include"
    }).then(response => {
      if(response.ok){
        return response.json();
      }
    }).then(data => {
      favourites = data.length}
    );
    return favourites;
  }

  const contextValue = {
    token: token,
    id: cookie["user"],
    username: username,
    getUsername: getUsernameHandler,
    favourites: getFavouritesHandler,
    isLoggedIn: userIsLoggedIn || cookie['Authorization-Cookie'],
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;