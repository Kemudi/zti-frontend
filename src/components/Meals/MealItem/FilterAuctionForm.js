import { useRef, useState } from "react";

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
                </div>
                <div >
                    <button>Filter</button>
                </div>
            </div>
        </form>
        <button onClick={cancelFilter}>Anuluj Filter</button>
        </div>
    );
}

export default FilterAuctionForm;