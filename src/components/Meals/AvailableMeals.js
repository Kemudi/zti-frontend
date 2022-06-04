import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import FilterAuctionForm from './MealItem/FilterAuctionForm';
import { useCookies } from 'react-cookie';
import AuthContext from '../../store/auth-context';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [loggedUser, setLoggedUser] = useState();

  const authCtx = useContext(AuthContext);

  let navigate = useLocation();

  const fetchAuctions = (filterAuctions) => {
    {
      const fetchMeals = async (filter) => {
        let response;
        if (props.favourites === true) {
          const id = cookies["user"];

          response = await fetch(
            `http://localhost:8081/api/users/me/favourites`, {
            credentials: "include",
            method: 'GET',
          });
        } else if (props.myAuctions === true) {
          const id = cookies["user"];
          response = await fetch(
            `http://localhost:8081/api/users/me/auctions`, {
            method: 'GET',
            credentials: "include",
          }
          );
        } else {
          if (filter != null) {
            response = await fetch(
              'http://localhost:8081/api/auctions/?' + new URLSearchParams({
                auction: filter,
              })
            );
          } else {
            response = await fetch(
              'http://localhost:8081/api/auctions/'
            );
          }
        }



        if (!response.ok) {
          throw new Error('Coś poszło nie tak!');
        }

        const responseData = await response.json();

        const loadedMeals = [];

        let loggedUser = null;
        if (authCtx.isLoggedIn) {
          const usernameResponse = await fetch(`http://localhost:8081/api/users/me/username`, {
            method: 'GET',
            credentials: "include"
          });

          if(usernameResponse.ok){
            const usernameResponseData = await usernameResponse.json();
            loggedUser = usernameResponseData.username;
          } 
        }
        
        console.log(loggedUser);

        for (const key in responseData) {
          loadedMeals.push({
            key: key,
            id: responseData[key].id,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].currentPrice,
            date: responseData[key].publicationDate,
            userId: responseData[key].owner.id,
            username: responseData[key].owner.username,
            loggedUser: loggedUser,
          });
          console.log(responseData[key].publicationDate);
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      };

      fetchMeals(filterAuctions).catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });


    }
  }

  useEffect(fetchAuctions, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Ładowanie...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.key}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      date={new Date(meal.date)}
      userId={meal.userId}
      username={meal.username}
      loggedUser={meal.loggedUser}
    />
  ));

  return (
    <section className={classes.meals}>
      {!navigate.pathname.match("/favourites") && <FilterAuctionForm fetchAuctions={fetchAuctions} />}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
