import { useRef } from 'react';

const FillingList = props => {
    let fillings;

    const fillingInput = useRef();

    const changeHandler = event => {
        event.preventDefault();
        const enteredFillingId = fillingInput.current.value;
        props.onChangeHandler(enteredFillingId);
    };

    if(props.items) {
        fillings = props.items.map(item => (
            <option key={item.fillingId} value={item.fillingId}>{item.fillingName}</option> 
        ));
    }

    return <div>
        <form >
            <select name='fillings' id='fillings-select'  onChange={changeHandler} ref={fillingInput}>
                <option value="" >--Wybierz nadzienie--</option>
                {fillings}
            </select>
        </form>
    </div>;
};

export default FillingList;