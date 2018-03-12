import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

class Dashboard extends React.Component {
  state = { products: [], showForm: false }

  componentDidMount() {
    axios.get('/api/products')
      .then( res => this.setState({ products: res.data }) )
  }

  show = () => {
    const { products } = this.state
    return (
      <ul>
        { products.map( p =>
            <li key={p.id}>
              <Link to={`/products/${p.id}`}>{p.name}</Link>
            </li>
          )
        }
      </ul>
    )
  }

  form = () => {
    return <Form submit={this.submit} />
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  submit = (product) => {
    const { products } = this.state
    axios.post('/api/products', { product })
      .then( res => {
        this.setState({
          products: [res.data, ...products],
          showForm: false
        })
      })
      .catch( err => console.log(err.response.data) )
  }

  render() {
    const { showForm } = this.state;
    return (
      <div>
        <h2>Products</h2>
        <button onClick={this.toggleForm}>
          { showForm ? 'Hide' : 'Show' } 
        </button>
        { showForm ? this.form() : this.show() }
      </div>
    )
  }
}

export default Dashboard;
