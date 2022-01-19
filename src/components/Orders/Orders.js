import React from 'react';
import './Orders.css';
import { getRandomNum } from '../../utilities';

const Orders = ({ orders }) => {
  const orderEls = orders.map(order => {
    return (
      <div key={getRandomNum(1, 10000)} data-cy='order' className="order">
        <h3 data-cy='order-name'>{order.name}</h3>
        <ul data-cy='order-ingredient-list' className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={getRandomNum(1, 5000)} data-cy='order-ingredient'>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section data-cy='order-section'>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;