import React from "react";
import styles from "./confirmOrder.module.css";
import useInput from "../../Hooks/use-input";

const ConfirmOrder = (props) => {
 
    const {
        input:name,
        isValid: nameIsValid,
        isFieldInvalid: nameFieldIsInvalid,
        inputChangeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        resetValues: nameReset
    } = useInput(value => value.trim().length !== 0);
    const {
        input: street,
        isValid: streetIsValid,
        isFieldInvalid: streetFieldIsInvalid,
        inputChangeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
        resetValues: streetReset
    } = useInput(value => value.trim().length !== 0);
    const {
        input:postalcode,
        isValid: postalCodeIsValid,
        isFieldInvalid: postalCodeFieldIsInvalid,
        inputChangeHandler: postalCodeChangeHandler,
        blurHandler: postalCodeBlurHandler,
        resetValues: postalCodeReset
    } = useInput(value => value.trim().length === 5);
    const {
        input:city,
        isValid: cityIsValid,
        isFieldInvalid: cityFieldIsInvalid,
        inputChangeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
        resetValues: cityReset
    } = useInput(value => value.trim().length !== 0);

    let formIsValid = false;

    if (!nameFieldIsInvalid && !streetFieldIsInvalid && !postalCodeFieldIsInvalid && !cityFieldIsInvalid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        nameBlurHandler();
        streetBlurHandler();
        postalCodeBlurHandler();
        cityBlurHandler();

        if(!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid) {
            return;
        }

        props.confirmOrderHandler({
            name,
            street,
            postalcode,
            city
        });

        nameReset();
        streetReset();
        postalCodeReset();
        cityReset();
    }

    const nameClasses = nameFieldIsInvalid ? `${styles.control} ${styles.invalid}` : styles.control;
    const streetClasses = streetFieldIsInvalid ? `${styles.control} ${styles.invalid}` : styles.control;
    const postalCodeClasses = postalCodeFieldIsInvalid ? `${styles.control} ${styles.invalid}` : styles.control;
    const cityClasses = cityFieldIsInvalid ? `${styles.control} ${styles.invalid}` : styles.control;


  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
        {nameFieldIsInvalid && <p className={styles.error}>Please Enter name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" value={street} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetFieldIsInvalid && <p className={styles.error}>Please Enter Street</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postalcode">Postal Code</label>
        <input type="text" id="postalcode" value={postalcode} onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler} />
        {postalCodeFieldIsInvalid && <p className={styles.error}>Postal code should be 5 character</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={city} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityFieldIsInvalid && <p className={styles.error}>Please enter city.</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!formIsValid} >Confirm</button>
      </div>
    </form>
  );
};

export default ConfirmOrder;
