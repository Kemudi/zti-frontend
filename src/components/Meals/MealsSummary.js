import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Aktualne ogłoszenia</h2>
      <p>
        Przeglądaj ogłoszenia innych użytkowników oraz wystawiaj swoje przedmioty!
      </p>
      <p>
       Dodaj interesujące Cię ogłoszenia do ulubionych oraz kontaktuj się z wystawiającym w celu dokonania transakcji.
      </p>
    </section>
  );
};

export default MealsSummary;
