import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

// import { Route, Routes } from 'react-router-dom';
import { Switch , Route} from 'react-router-dom';
import AuthForm from './authentication/AuthForm';
import AuctionForm from './components/Meals/AuctionForm'
import ProtectedRoute from './routes/ProtectedRoute';
import LoginProtectedRoute from './routes/LoginProtectedRoute';
import UserProfile from './components/User/UserProfile';

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
          <LoginProtectedRoute path="/auth" component={AuthForm}>
          </LoginProtectedRoute>
          <ProtectedRoute path="/addAuction" component={AuctionForm}>
          </ProtectedRoute>
          <ProtectedRoute path="/user/:userId" component={UserProfile}>
          </ProtectedRoute>
        </Switch> 
      </main>
    </CartProvider>
  );
}

export default App;
