import React, { useContext, useEffect, useState } from "react";

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../Context/cart-context";

const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const context = useContext(CartContext);

    const numberOfItems = context.items.reduce((total, item) => {
        return total + item.amount;
    }, 0)

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    useEffect(() => {
        if (context.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () =>{
            clearTimeout(timer);
        }
    }, [context.items]);

    return (
        <button className={btnClasses} onClick={props.modalHandler} >
            <span className={styles.icon} >
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge} >{numberOfItems}</span>
        </button>
    );
}

export default HeaderCartButton;