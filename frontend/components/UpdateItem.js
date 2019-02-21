import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {}

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

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id, 
        ...this.state,
      }
    })
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
        {({data, loading}) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item fround for id ${this.props.id}</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
            { (updateItem, {loading, error}) => (
              <Form onSubmit={e => this.updateItem(e, updateItem)} >
                <Error err={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  
                  <label htmlFor='title'>
                    Title
                  <input 
                    type='text' 
                    id='title' 
                    name='title' 
                    placeholder='Title' 
                    defaultValue={data.item.title} 
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
                    defaultValue={data.item.description} 
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
                    defaultValue={data.item.price} 
                    onChange={this.handleChange} 
                    required
                    />
                  </label>
                  <button type='submit'>{loading ? 'Saving' : 'Save'} Changes</button>
                </fieldset>
              </Form>
            )}
            </Mutation>
          ) 
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export {UPDATE_ITEM_MUTATION};