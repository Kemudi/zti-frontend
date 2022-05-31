import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const cookieName = 'Authorization-Cookie';

  const[cookie,setCookie,removeCookie] = useCookies([cookieName]);


  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setCookie(cookieName,token);
    setToken(token);
  };

  const logoutHandler = () => {
    removeCookie(cookieName);
    setToken(null);
  };

  const contextValue = {
    token: token,
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