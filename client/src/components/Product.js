import React from 'react';
import axios from 'axios';
import Form from './Form';

class Product extends React.Component {
  state = { product: {}, edit: false }

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    axios.get(`/api/products/${id}`)
      .then( res => this.setState({ product: res.data }) )
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !state.edit }
    })
  }

  submit = (product) => {
    axios.put(`/api/products/${this.props.match.params.id}`)
      .then( res => this.setState({ product: res.data, edit: false }))
  }

  show = () => {
    const { product: { name, description, price, department}} = this.state
    return (
      <div>
        <h1>{name}</h1>
        <h3>{description}</h3>
        <h3>${price}</h3>
        <h3>{department}</h3>
      </div>
    )
  }

  edit = () => {
    const { product } = this.state
    return <Form submit={this.submit} {...product} />
  }

  render() {
    const { edit } = this.state
    return (
      <div>
        { edit ? this.edit() : this.show() }
        <button onClick={this.toggleEdit}>
          { edit ? 'Cancel' : 'Edit' }
        </button>
      </div>
    )
  }
}

export default Product;
