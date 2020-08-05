import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Story from '../Story/Story';
import UserInput from '../UserInput/UserInput';

class Main extends Component {
  
  render() {
    return (
      <>
        <LogOutButton />
        <Story />
        <UserInput />
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = ( state ) => ({
  state
});

// this allows us to use <App /> in index.js
export default connect( mapStateToProps )( Main );
