import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const fetchMeals = async() => {
    const response = await fetch("https://react-326e2-default-rtdb.firebaseio.com/meals.json");
    if(!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
        const mealArray = [];
        for (const key in data) {
          mealArray.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(mealArray);
        setIsLoading(false);
      }
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setErrorMsg(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading . . .</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className={styles.error}>
        <p>{errorMsg}</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
