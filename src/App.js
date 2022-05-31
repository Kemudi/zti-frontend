import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

// import { Route, Routes } from 'react-router-dom';
import { Switch , Route} from 'react-router-dom';
import AuthForm from './authentication/AuthForm';
import AuctionForm from './components/Meals/AuctionForm'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Switch>
          <Route path="/" exact>
            <Meals />
          </Route>
          <Route path="/auth">
            <AuthForm></AuthForm>
          </Route>
          <Route path="/addAuction">
            <AuctionForm></AuctionForm>
          </Route>
        </Switch> 
      </main>
    </CartProvider>
  );
}

export default App;
