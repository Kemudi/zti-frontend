import { Fragment, useContext } from 'react';

import MealsSummary from './MealsSummary';
import classes from './MealsButton.module.css';
import AvailableMeals from './AvailableMeals';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';


const Meals = (props) => {
  const authCtx = useContext(AuthContext);  

  return (
    <Fragment>
      <MealsSummary />
      {authCtx.isLoggedIn && <Link to="/addAuction">
        <div className={classes['auction-reference']}>
          <button>Dodaj swoje ogłoszenie!</button>
        </div>
        </Link>}
      <AvailableMeals favourites={props.favourites}/>
    </Fragment>
  );
};

export default Meals;
