import classes from './UserProfile.module.css';
const UserBio = (props) => {
    return(
        <div>
            <h1 className={classes.aa}>Użytkownik: {props.user.username}</h1>
            <h1 className={classes.aa}>Kontakt: {props.user.phoneNumber}</h1>
        </div>
    );
}

export default UserBio;