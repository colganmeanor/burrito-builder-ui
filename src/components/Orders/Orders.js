import React from 'react';
import './Orders.css';
import { getRandomNum } from '../../utilities';

const Orders = ({ orders }) => {
  const orderEls = orders.map(order => {
    return (
      <div key={getRandomNum(1, 10000)}className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={getRandomNum(1, 5000)}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;