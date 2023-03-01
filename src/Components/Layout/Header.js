import React, { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImage from '../../Assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header} >
                <h1>FoodStore</h1>
                <HeaderCartButton modalHandler={props.modalHandler}/>
            </header>
            <div className={styles['main-image']} >
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </Fragment>
    );
}

export default Header;