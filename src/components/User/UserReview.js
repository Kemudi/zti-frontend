
import classes from "./UserReview.module.css"

const UserReview = (props) => {
    return (
        <div>
            <div className={classes.review}>
                <div>
                    <div >
                        <div>{props.description}</div>
                        <div>
                            <h2>{props.mark}</h2>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReview;