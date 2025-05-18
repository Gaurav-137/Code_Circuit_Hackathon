import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatDate } from '../utils/dateHelpers';

export default function MealLog() {
  const [meals, setMeals] = useLocalStorage('meals', {});
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const todayKey = formatDate(new Date());

  const todaysMeals = meals[todayKey] || [];

  const addMeal = () => {
    if (!mealName || !calories || isNaN(calories)) return;
    const updatedMeals = { ...meals };
    if (!updatedMeals[todayKey]) updatedMeals[todayKey] = [];
    updatedMeals[todayKey].push({ mealName, calories: Number(calories) });
    setMeals(updatedMeals);
    setMealName('');
    setCalories('');
  };

  const totalCalories = todaysMeals.reduce((acc, m) => acc + m.calories, 0);

  return (
    <div>
      <h2>Meal Log</h2>
      <div>
        <input
          type="text"
          placeholder="Meal name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          min="0"
        />
        <button onClick={addMeal}>Add Meal</button>
      </div>

      <h3>Today's Meals</h3>
      {todaysMeals.length === 0 ? (
        <p>No meals logged today.</p>
      ) : (
        <table className="meal-log-table">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {todaysMeals.map((meal, i) => (
              <tr key={i}>
                <td>{meal.mealName}</td>
                <td>{meal.calories}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>{totalCalories}</th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
