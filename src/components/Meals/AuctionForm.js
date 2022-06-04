import { useState, useContext, useRef } from 'react';
import classes from '../../authentication/AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuctionForm = () => {

    const[sent,setSent] = useState(false);
    const[loading, setLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const descriptionInputRef = useRef();

    const handleSetChange = () =>{
        setSent(false);
    }

    const addAuction = (event) =>{
        event.preventDefault();
        
        const name = nameInputRef.current.value;
        const price = priceInputRef.current.value;
        const description = descriptionInputRef.current.value;

        setLoading(true);
        fetch("http://localhost:8081/api/auctions/",{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                currentPrice: price,
                buyNowPrice: price,
                description: description,
            }),
            headers:{
                Accept: "application/json",
                'Content-Type' : 'application/json',
                // 'Access-Control-Request-Method': 'POST',
                // 'Access-Control-Allow-Credentials' : 'true',
                // 'Access-Control-Allow-Origin': '*',
                // Cookie: 'Authorization-Cookie='+authCtx.token,
            },
        }).then(response => {
            if(response.status === 201){
                setSent(true);
                alert("Ogłoszenie dodane");
            }else{
                throw new Error("Nie udało się dodać ogłoszenia");
            }
        }).catch(error => alert(error.message))
        .finally( () =>{
            setLoading(false);
        });
    }

    if (!sent) return (
        <section className={classes.auth}>
            <h1>Utwórz swoje ogłoszenie:</h1>
            <form onSubmit={addAuction}>
                <div className={classes.control}>
                    <label htmlFor='name'>Tytuł ogłoszenia</label>
                    <input type='text' id='name' required ref={nameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='price'>Cena</label>
                    <input type="number" step="0.01" required ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Opis</label>
                    <textarea id='description' required ref={descriptionInputRef} rows="4" cols="50"/>
                </div>
                <div className={classes.actions}>
                <button>Dodaj</button>
                <button
                    type='button'
                    className={classes.toggle}
                >
                </button>
            </div>
            </form>
        </section>
    )
    else{
        return(
            <section className={classes.auth}>
                <h1>Dodaj kolejne ogłoszenie</h1>
                <div className={classes.actions}>
                <button>Dodaj</button>
                <button
                    type='button'
                    className={classes.toggle}
                    onClick={handleSetChange}
                >
                </button>
            </div>
            </section> 
        )
    }


}

export default AuctionForm;