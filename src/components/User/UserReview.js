
import classes from "./UserReview.module.css"

const UserReview = (props) => {
    return (
        <div>
            <div className={classes.review}>
                <div>
                    <div >
                        <div><h3>{props.description}</h3></div>
                        <div>
                            <h2>Ocena: {props.mark}</h2>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReview;