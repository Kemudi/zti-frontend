import React,{ Fragment , useContext} from 'react';
import { Link } from 'react-router-dom';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

import AuthContext from '../../store/auth-context';

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () =>{
    authCtx.logout();
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <Link to="/"><h1>Krakowskim Targiem</h1></Link>
        
          
        {authCtx.isLoggedIn && <HeaderCartButton onClick={props.onShowCart} />}
        {authCtx.isLoggedIn && <Link to="/myAuctions"><div><h3>Moje Ogłoszenia</h3></div></Link>}
        {!authCtx.isLoggedIn && <Link to="/auth"><div><h3>Zaloguj</h3></div></Link>}
        {authCtx.isLoggedIn && <div onClick={logoutHandler}><h3>Wyloguj</h3></div>}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='Miejsce pełne ogłoszeń!' />
      </div>
    </Fragment>
  );
};

export default Header;
