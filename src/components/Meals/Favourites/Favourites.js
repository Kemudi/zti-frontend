import { Fragment, useContext } from 'react';

import MealsSummary from '../MealsSummary';
import classes from '../MealsButton.module.css';
import AvailableMeals from '../AvailableMeals';
import AuthContext from '../../../store/auth-context';
import { Link } from 'react-router-dom';


const Favourites = (props) => {
  const authCtx = useContext(AuthContext);  

  return (
    <Fragment>
      {/* <MealsSummary /> */}
      <AvailableMeals favourites={true}/>
    </Fragment>
  );
};

export default Favourites;