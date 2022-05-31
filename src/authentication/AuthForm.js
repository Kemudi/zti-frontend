import { useState } from 'react';

import classes from './AuthForm.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {isLogin && <LoginForm></LoginForm>}
      {!isLogin && <RegisterForm></RegisterForm>}
      {/* {isLoading && <p>Sending request...</p>} */}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
    </section>
  );
};

export default AuthForm;