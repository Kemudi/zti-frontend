import { useContext } from 'react';
import {useHistory, Link, useLocation} from 'react-router-dom';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import DateItem from './DateItem';
import AuthContext from '../../../store/auth-context';
import DeleteMyAuctionForm from '../MyAuctions/DeleteMyAuctionForm';

import { useCookies } from 'react-cookie';
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  const price = `${props.price.toFixed(2) + ' zł'}`;

  let navigate = useLocation();

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
    });
    console.log(props.id);

    fetch(`http://localhost:8081/api/auctions/${props.id}/favourites/`,{
      method: 'POST',
      credentials: "include",
    }).then(response => {
      if(response.status == 201){
        alert("Dodano do ulubiony");
      }else if(response.status == 409){
        alert("Przedmiot już jest w ulubionych");
      }else{
        throw new Error("Nie dodano do ulubionych");
      }
    }).catch(error => alert(error.message));
    
  };

  const deleteAuctionHandler = () =>{
    fetch(`http://localhost:8081/api/users/me/auctions/${props.id}/`,{
      method: 'DELETE',
      credentials: "include",
    }).then(response => {
      if(response.status == 204){
        alert("Usunięto aukcję");
      }else{
        throw new Error("Nie udało się usunąć ogłoszenia");
      }
    }).catch(error => alert(error.message)).finally(()=>{
      window.location.reload(false);
    });
  }

  

  const redirectToUserHandler = () => {
    navigate.push("/user/"+props.userId)
  }

  console.log(props.loggedUser);

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
      {(authCtx.isLoggedIn && props.loggedUser!=null && props.loggedUser != undefined) &&
      <div>
      {(!navigate.pathname.match("/favourites") && props.loggedUser != props.username) &&
       <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
      }
      
      { props.loggedUser == props.username &&
        <div>
        <DeleteMyAuctionForm deleteAuction={deleteAuctionHandler}></DeleteMyAuctionForm>
      </div>
      }

      </div>}
      
    

      
        
      
    </li>
  );
};

export default MealItem;
