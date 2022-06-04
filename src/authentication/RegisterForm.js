import { useState , useRef, useContext} from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';

const LoginForm = () => {
    const [failed, setFailed] = useState(false);
    const [loading,setLoading] = useState(true);

    const authCtx = useContext(AuthContext); 

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const emailInputRef = useRef();
    const nameinputRef = useRef();
    const phoneInputRef = useRef();

    const registerHandler = (event) =>{
        event.preventDefault();

        const enteredPassword = passwordInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredName = nameinputRef.current.value;
        
        setLoading(true);
        fetch("http://localhost:8081/api/users/",{
            method : 'POST',
            body: JSON.stringify({
                username: enteredUsername,
                email: enteredEmail,
                password: enteredPassword,
                name: enteredName,
                phoneNumber: enteredPhone,
            }),
            headers:{
                Accept: "application/json",
                'Content-Type' : 'application/json',
            },
        }).then(res => {
            if(res.status === 201){
                alert("Rejestracja przebiegla pomyslnie");
            }else{
                throw new Error("Registration Failed");
            }
        })
        .catch(error=>{
            alert(error.message);
            setFailed(true);
        })
        .finally(() => setLoading(false));
    }


    return (
        <form onSubmit={registerHandler}>
            <div className={classes.control}>
                <label htmlFor='username'>Nick</label>
                <input type='text' id='username' required ref={usernameInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='password'>Hasło</label>
                <input type='password' id='password' required ref={passwordInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='name'>Imię</label>
                <input type='text' id='name' required ref={nameinputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='phone'>Nr telefonu</label>
                <input type='text' id='phone' required ref={phoneInputRef} />
            </div>
            <div className={classes.actions}>
                <button>Zarejstruj się</button>
                <button
                    type='button'
                    className={classes.toggle}
                >
                </button>
            </div>
        </form>
    );
}

export default LoginForm;