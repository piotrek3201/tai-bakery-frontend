import { useRef } from 'react';

const GlazeList = props => {
    let glazes;

    const glazeInput = useRef();

    const changeHandler = event => {
        event.preventDefault();
        const enteredGlazeId = glazeInput.current.value;
        props.onChangeHandler(enteredGlazeId);
    };

    if(props.items) {
        glazes = props.items.map(item => (
            <option key={item.glazeId} value={item.glazeId}>{item.glazeName}</option> 
        ));
    }

    return <div>
        <form >
            <select name='glazes' id='glazes-select'  onChange={changeHandler} ref={glazeInput}>
                <option value="" >--Wybierz polewę--</option>
                {glazes}
            </select>
        </form>
    </div>;
};

export default GlazeList;