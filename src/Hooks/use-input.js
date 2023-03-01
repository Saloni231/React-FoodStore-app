import { useState } from "react";

const useInput = (validationFunction) => {
    const [input, setInput] = useState("");
    const [isBlur, setIsBlur] = useState(false);

    const isValid = validationFunction(input);
    const isFieldInvalid = !isValid && isBlur;

    const blurHandler = () => {
        setIsBlur(true);
    }

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
    }

    const resetValues = () => {
        setInput('');
        setIsBlur(false);
    }

    return {
        input,
        isValid,
        isFieldInvalid,
        inputChangeHandler,
        blurHandler,
        resetValues
    }
}

export default useInput;