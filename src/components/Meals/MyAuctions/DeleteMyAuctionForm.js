import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './DeleteMyAuctionForm.module.css';

const DeleteMyAuctionForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    props.deleteAuction();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>

      <button>Usuń ogłoszenie </button>
      {!amountIsValid && <p>.</p>}
    </form>
  );
};

export default DeleteMyAuctionForm;
