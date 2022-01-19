import React, { Component } from 'react';
import { postOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleIngredientChange = (event) => {
    event.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients, event.target.name]
    })
  }

 getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  orderChecker = () => {
    const orderObj = {
      id: this.getRandomNum(10, 1000),
      name: this.state.name,
      ingredients: this.state.ingredients
    }
     if(orderObj.name === ''){
       alert('Missing Name! Name Required for order')
     } else if (!orderObj.ingredients.length) {
      alert('Hey bud, we need at least one ingredient for this burrito.')
     } else {
       postOrder(orderObj)
     }

  }

  handleSubmit = e => {
    // e.preventDefault();
    this.orderChecker()
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
