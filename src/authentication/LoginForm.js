import { useState , useRef, useContext} from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';



const LoginForm = () => {
    

    const [failed, setFailed] = useState(false);
    const[loading,setLoading] = useState(true);


    const authCtx = useContext(AuthContext); 

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const loginHandler = (event) =>{
        event.preventDefault();

        const enteredPassword = passwordInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        
        setLoading(true);
        fetch("http://localhost:8081/api/auth/",{
            method : 'POST',
            body: JSON.stringify({
                username: enteredUsername,
                password: enteredPassword,
            }),
            headers:{
                Accept: "application/json",
                'Content-Type' : 'application/json',
            },
        }).then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Authentication Failed");
            }
        }).then(data => {
            authCtx.login(data.token, enteredUsername, data.id);
        })
        .catch(error=>{
            alert(error.message);
            setFailed(true);
        })
        .finally(() => setLoading(false));
    }


    return (
        
        <form onSubmit={loginHandler}>
            <div className={classes.control}>
                <label htmlFor='username'>Twój nick</label>
                <input type='text' id='username' required ref={usernameInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='password'>Twoje hasło</label>
                <input type='password' id='password' required ref={passwordInputRef} />
            </div>
            <div className={classes.actions}>
                <button>Zaloguj się</button>
                <button
                    type='button'
                    className={classes.toggle}
                >
                </button>
            </div>
        </form>
    )
}

export default LoginForm;