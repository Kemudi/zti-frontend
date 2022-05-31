import './DateItem.css'
function DateItem(props) {
    console.log(props.date)
    const month = props.date.toLocaleString('pl', { month: 'long' });
    const year = props.date.getFullYear();
    const day = props.date.toLocaleString('pl', { day: '2-digit' });

    return (
        <div className = 'expense-date'>
            <div className = 'expense-date__month'> {month} </div>
            <div className = 'expense-date__year'> {year} </div>
            <div className = 'expense-date__day'> {day} </div>
        </div>
    );
}

export default DateItem;