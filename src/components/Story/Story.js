import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
    state = {
        senarioSoFar: [],
        senarioCount: 0,
        userInputSoFar: [],
        userInputCount: 0
    }

    componentDidMount() {
      // store all the story items
      this.props.dispatch({ type: 'FETCH_SENARIO' });
    }
    
    componentDidUpdate( prevProps ) {

      // catch when new input is entered
      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {
        // AUDRY - maybe for shuffle, we can decide what happens here
        // aka whatShallHappen(userInput) -->?
        this.updateUserInput();

        this.whatShallHappenNext();
      }
    }

    updateUserInput = () => {
      // inputs are created on the fly, so collect as we go along
      let nextUserInput = this.props.reduxState.input;

      // put this is a var - not really a shallow copy, right? but wtvr
      let stateUserInputList = this.state.userInputSoFar;

      // yay new div w newly entered text
      let newUserInputDiv = <div key={ this.state.userInputCount }>{ nextUserInput }</div>;

      // set for later!
      this.setState({
        userInputSoFar: stateUserInputList.concat( newUserInputDiv ),
        userInputCount: this.state.userInputCount + 1
      });
    }
    
    updateSenario = () => {
      // get the senario next in line
      // but beware we run out of senarios!
      if ( this.props.reduxState.senarioList.length < this.state.senarioCount + 1 ) {
        console.warn( 'ran out of senarios!' );
        return '';
      }

      let nextSenario = this.props.reduxState.senarioList[ this.state.senarioCount ].senario;

      // put this is a var - not really a shallow copy, right? but wtvr
      let stateSenarioList = this.state.senarioSoFar;
      
      // yay new div w newly entered text
      let newSenarioDiv = <div key={ this.state.senarioCount }>{ nextSenario }</div>;

      // set for later!
      this.setState({
        senarioSoFar: stateSenarioList.concat( newSenarioDiv ),
        senarioCount: this.state.senarioCount + 1
      });
    }

    whatShallHappenNext = () => {

      // at some point in here, we'll have to do this
      this.updateSenario();  

      // if input === 'closet' etc

      // trigger next story
      // if input === done or next or something
      // get the next item in senarioList
    }
    
    render() {    
        return (
            <div className="storyBox">
                {/* we've got to tangle these up */}
                <div>{ this.state.senarioSoFar }</div>
                <div>{ this.state.userInputSoFar }</div>
            </div>
        );
    }
}

const mapStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapStateToProps )( Story );
