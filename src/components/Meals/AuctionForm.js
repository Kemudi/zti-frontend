import { useState, useContext, useRef } from 'react';
import classes from '../../authentication/AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuctionForm = () => {

    const[sent,setSent] = useState(false);

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

        fetch("http://localhost:8081/api/auctions/",{
            method: 'POST',
            body: JSON.stringify({
                name: name,
                currentPrice: price,
                buyNowPrice: price,
                description: description,
            }),
            headers:{
                Accept: "application/json",
                'Content-Type' : 'application/json',
                // Cookie: 'Authorization-Cookie='+authCtx.token,
            },
        }).then(response => {
            if(response.status === 201){
                setSent(true);
                alert("Ogłoszenie dodane");
            }else{
                throw new Error("Nie udało się dodać ogłoszenia");
            }
        }).catch(error => alert(error.message)).finally(console.log("elo"));
    }

    if (!sent) return (
        <section className={classes.auth}>
            <h1>Dodaj Ogłoszenie</h1>
            <form onSubmit={addAuction}>
                <div className={classes.control}>
                    <label htmlFor='name'>Auction Name</label>
                    <input type='text' id='name' required ref={nameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='price'>Auction Price</label>
                    <input type="number" step="0.01" required ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' required ref={descriptionInputRef} />
                </div>
                <div className={classes.actions}>
                <button>Dodaj Ogłoszenie</button>
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
                <h1>Dodaj Ogłoszenie</h1>
                <div className={classes.actions}>
                <button>Dodaj Następną</button>
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