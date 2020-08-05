import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../UserInput/UserInput.css';

class UserInput extends Component {
  
  render() {
    return (
      <>
        <input type="text" className="userInputBox" placeholder="here is the user input" />
      </>
    );
  }
}


const mapStateToProps = ( state ) => ({
  state
});

export default connect( mapStateToProps )( UserInput );
