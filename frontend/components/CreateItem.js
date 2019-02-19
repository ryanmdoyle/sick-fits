import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'a title',
    description: 'things',
    image: 'small.jpg',
    largeImage: 'lrg.jpg',
    price: 2000,
  }

  handleChange = (e) => {
    //get the important stuff from the event (you need to update the state or R intercepts and won't allow form field entry)
    const { name, type, value } = e.target;
    // will check the event value and return an actual interger if it's a number vs a string
    const val = (type === 'number') ? parseFloat(value) : value;
    // [name] is the computed property name, and essentially is whatever the event name actually is from the form names
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      { (createItem, {loading, error}) => (
        <Form onSubmit={async (e) => {
          e.preventDefault();
          const response = await createItem();
          // routes to the single item page after adding the item
          Router.push({
            pathname: '/item', 
            query: { id: response.data.createItem.id }
          })
        }}>
          <Error err={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor='title'>
              Title
            <input 
              type='text' 
              id='title' 
              name='title' 
              placeholder='Title' 
              value={this.state.title} 
              onChange={this.handleChange} 
              required
              />
            </label>

            <label htmlFor='description'>
              Description
            <textarea 
              type='text' 
              id='description' 
              name='description' 
              placeholder='Enter a Description' 
              value={this.state.description} 
              onChange={this.handleChange} 
              required
              />
            </label>

            <label htmlFor='price'>
            Price
            <input 
              type='number' 
              id='price' 
              name='price' 
              placeholder='Price' 
              value={this.state.price} 
              onChange={this.handleChange} 
              required
              />
            </label>
            <button type='submit'>Submit</button>
          </fieldset>
        </Form>
      )}
      </Mutation>
    );
  }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};