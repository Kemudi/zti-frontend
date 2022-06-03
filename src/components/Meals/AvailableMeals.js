import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import FilterAuctionForm from './MealItem/FilterAuctionForm';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchAuctions = (filterAuctions) => {
    {
      const fetchMeals = async (filter) => {
        let response;
        if(filter != null){
          response = await fetch(
            'http://localhost:8081/api/auctions/?' +new URLSearchParams({
              auction: filter,
          })
          );
        } else{
           response = await fetch(
            'http://localhost:8081/api/auctions/'
          );
        }
        
  
        if (!response.ok) {
          throw new Error('Coś poszło nie tak!');
        }
  
        const responseData = await response.json();
  
        const loadedMeals = [];
  
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].currentPrice,
            date: responseData[key].publicationDate,
            userId: responseData[key].owner.id,
            username: responseData[key].owner.username,
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

  useEffect(fetchAuctions , []);

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
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      date={new Date(meal.date)}
      userId={meal.userId}
      username={meal.username}
    />
  ));

  return (
    <section className={classes.meals}>
      <FilterAuctionForm fetchAuctions={fetchAuctions}/>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
