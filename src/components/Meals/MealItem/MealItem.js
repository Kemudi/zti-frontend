import { useContext } from 'react';
import {useHistory, Link} from 'react-router-dom';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import DateItem from './DateItem';
import AuthContext from '../../../store/auth-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const price = `${props.price.toFixed(2) + ' zł'}`;

  let navigate = useHistory();

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  const redirectToUserHandler = () => {
    navigate.push("/user/"+props.userId)
  }

  return (
    <li className={classes.meal}>
      <div>
        <div className={classes.date}><DateItem date={props.date} /> </div>

        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
          <div className={classes.description}><Link to={`user/${props.userId}`}>{props.username}</Link></div>
        </div>

      </div>
      {authCtx.isLoggedIn && <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>}
    </li>
  );
};

export default MealItem;
