import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";

class Main extends Component {
  
  render() {
    return (
      <>
        <LogOutButton className="log-in" />
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = ( state ) => ({
  user: state.user
});

// this allows us to use <App /> in index.js
export default connect( mapStateToProps )( Main );
