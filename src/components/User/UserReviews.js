import { useState, useEffect } from "react";
import Card from "../UI/Card";
import UserReview from "./UserReview";
import UserReviewForm from "./UserReviewForm";

const UserReviews = (props) =>{
    const user = props.user;

    const[reviews,setReviews] = useState(null);
    const[loading, setLoading] = useState(true);

    const loadReviews = ()=>{
        fetch(`http://localhost:8081/api/users/${props.user.id}/reviews`,{
            method:"GET",
            credentials: 'include',
        }).then(response => {
            if(response.status === 200){
                return response.json();
            }else{
                throw new Error("Nie udało się pobrać ocen użytkownika");
            }
        }).then(data => {
            setReviews(data);
        }).catch(error=>{
            alert(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(loadReviews, [])

    

    if(loading) return "Ładowanie recenzji...";
    
    const userReviewList = reviews.map((review) => (
        <UserReview
          key={review.id}
          id={review.id}
          mark={review.mark}
          description={review.description}
          
        />
    ));

    return (
        <div>
            <Card>
            <ul>{userReviewList}</ul>
            </Card>
            <UserReviewForm
                userId={user.id}
                refresh={loadReviews}
            />
        </div>
    );
}

export default UserReviews;