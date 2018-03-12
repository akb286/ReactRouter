import React from 'react';
import { Route } from 'react-router-dom';
import Cars from './Cars';
import Car from './Car';

class CarWrapper extends React.Component {
  state = { cars: [] }

  componentDidMount() {
    axios.get('/api/cars')
      .then( res => this.setState({ cars: res.data })
  }

  render() {
    const { cars } = this.state.cars
    const id = this.props.match.params.id
    const car = cars.find( car => car.id == car ) || {}
    <div>
      <Route exact path="/cars" render={ props =>
        <Cars cars={this.state.cars} {...props} />
      />
      <Route exact path="/cars/:id" render={ props => 
        <Car car={car} {...props} />
      />
    </div>
  }
}

export default CarWrapper
