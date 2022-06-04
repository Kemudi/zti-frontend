import { useRef, useState } from "react";
import classes from '../MealsButton.module.css';

const FilterAuctionForm = (props) => {
    const[loading,setLoading] = useState(false);
    const filterInputRef = useRef();


    const filterAuctions = (event) =>{
        event.preventDefault();
        
        const filter = filterInputRef.current.value;
        if(filter != null || filter != ""){
            setLoading(true);
            props.fetchAuctions(filter);
        }
    }

    const cancelFilter = () =>{
        props.fetchAuctions(null);
    }
    
    
    return(
        <div>
        <form onSubmit={filterAuctions}>
            <div>
                <div >
                    <input type='text' id='text' required ref={filterInputRef} placeholder="Szukaj..."/>
                    <button>Filtruj</button>
                    <button type="button" onClick={cancelFilter}>Anuluj</button>
                </div>
                
            </div>
        </form>
       
        </div>
    );
}

export default FilterAuctionForm;