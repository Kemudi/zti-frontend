
const UserBio = (props) => {
    return(
        <div>
            <h2>User : {props.user.username}</h2>
            <h2>Contact : {props.user.phoneNumber}</h2>
        </div>
    );
}

export default UserBio;