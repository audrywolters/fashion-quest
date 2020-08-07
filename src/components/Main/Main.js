import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Story from '../Story/Story';
import UserInput from '../UserInput/UserInput';
import '../Main/Main.css';

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


const mapStateToProps = ( state ) => ({
  state
});

export default connect( mapStateToProps )( Main );
