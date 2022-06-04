import { useRef, useState } from 'react';

import Input from '../UI/Input';
import classes from '../Meals/MealItem/MealItemForm.module.css';

const UserReviewForm = (props) => {

    const[amountIsValid, setAmountIsValid] = useState(true);

    const markInputRef = useRef();
    const descriptionInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const markEntered = markInputRef.current.value;
        const mark = +markEntered;
        const description = descriptionInputRef.current.value;


        if (
            markEntered.trim().length === 0 ||
            mark < 1 ||
            mark > 5
          ) {
            setAmountIsValid(false);
            return;
          }
        fetch(`http://localhost:8081/api/users/${props.userId}/reviews`,{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                description:description,
                mark:mark,
            }),
            headers:{
                Accept: "application/json",
                'Content-Type' : 'application/json',
            }
        }).then(response => {
            if(response.status === 201){
                alert("Dodano opinię o użytkowniku");
            }else{
                throw new Error("Nie udało się dodać opinii");
            }
        }).catch(error=>{
            alert(error.message);
        }).finally(()=>{
            props.refresh();
            console.log("Dodano ogłoszenie");
        })
    }

    return (
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
            <textarea ref={descriptionInputRef} id="description" rows="4" cols="223" placeholder="Dodaj opinię..."></textarea>
               <h1 className={classes.aa}><Input
                    ref={markInputRef}
                    label='Ocena 1-5:'
                    input={{
                        id: 'amount',
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1',
                    }}
                /></h1> 
                <button>Dodaj</button>
                {!amountIsValid && <p>Wpisz wartość z zakresu (1-5).</p>}
            </form>
        </div>
    );
}

export default UserReviewForm;