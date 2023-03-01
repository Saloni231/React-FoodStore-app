import React, { useRef, useState } from "react";
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {

    const inputRef = useRef();

    const [validInput, setValidInput] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        const amount = inputRef.current.value;
        const enteredAmount = +amount

        if (amount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setValidInput(false);
            return;
        }

        props.addToCart(enteredAmount);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler} >
            <Input ref={inputRef} label="Amount" input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step:'1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!validInput && <p>Please Enter a valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;