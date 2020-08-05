import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../UserInput/UserInput.css';

class UserInput extends Component {
  
    enterPressed = ( event ) => {
        if ( event.key !== 'Enter' ) {
            return;
        }

        // send this to story so it can print it in the box
        this.props.dispatch({ type: 'FETCH_INPUT', payload: event.target.value });

        // reset the input so user can start anew
        event.target.value = '';
    }

    render() {
        return (
            <input  type="text" 
                    className="userInputBox" 
                    placeholder="here is the user input"
                    onKeyDown={ this.enterPressed }
            />
        );
    }
}

// AUDRY - remove if not use
const mapStateToProps = ( reduxState ) => ({
  reduxState
});

export default connect( mapStateToProps )( UserInput );
