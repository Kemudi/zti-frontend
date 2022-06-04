import UserBio from "./UserBio";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; 
import UserReviews from "./UserReviews";
import classes from './UserProfile.module.css';

const UserProfile = () => {
    const { userId } = useParams();

    const[loading, setLoading] = useState(true);
    const[user,setUser] = useState(null);

    // setLoading(true);
    useEffect(() => {
        fetch(`http://localhost:8081/api/users/${userId}`,{
            method:'GET',
            credentials: 'include',
        }).then(response => {
            if(response.status === 200){
                return response.json();
            }else{
                throw new Error("Nie udało się pobrać informacji o użytkowniku");
            }
        }).then(data => {
            setUser(data);
        }).catch(error => {
            alert(error.message);
        }).finally(() => {
            setLoading(false);
        })

    }, [])

    if (loading) return "Ładowanie...";
    else return (
        <div className={classes.box} >
            <UserBio
                user={user}
            />
            <UserReviews
                user={user}
            />
        </div>
    );
}


export default UserProfile;