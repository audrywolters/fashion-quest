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
                    onKeyDown={ this.enterPressed }
            />
        );
    }
}


const mapStateToProps = ( reduxState ) => ({
  reduxState
});

export default connect( mapStateToProps )( UserInput );
