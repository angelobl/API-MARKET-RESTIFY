import React, { Component } from 'react';

class Users extends Component {
  state = { users: [] };

  callAPI() {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(res => this.setState({ users: res }));
  }

  componentDidMount() {
      this.callAPI();
  }

  renderItem = item => (
    <div>{item.name}</div>
  )

  render() {
    return (
      <div>
        <h1 className="col-md-8 d-block mx-auto text-center">Market</h1>
        {this.state.users.map(this.renderItem)}
      </div>
    )
  }
}

export default Users;
