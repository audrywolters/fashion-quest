import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
    state = {
        userID: 0,
        senarioSoFar: [],
        senarioCount: 0,
        userInputSoFar: [],
        userInputCount: 0,
        outfit: {},
        whatsHappening: [],
        whatsCount: 0
    }

    componentDidMount() {

      this.setState({
        userID: this.props.reduxState.user.id
      })

      // AUDRY - to load a story item right away:
      // get story senario from userID = storyState (will equal senairo 5 or whatevs)

      // store all the story items
      this.props.dispatch({ type: 'FETCH_SENARIO' });

    }
    
    // AUDRY - issue, if you type the same thing in a row, "k"
                  // it will not do anything cuz it "didn't update"
    componentDidUpdate( prevProps ) {

      // catch when new input is entered
      if ( prevProps.reduxState.input !== this.props.reduxState.input
          // AUDRY - this is bad!
          // || this.props.reduxState.input === 'k' 
          ) {

        console.log('comp did update. redux input changed')
        // AUDRY - maybe for shuffle, we can decide what happens here
        // aka whatShallHappen(userInput) -->?
        //this.updateUserInput();

        // how will we respond to the user?
        // what should we print next?
        this.whatShallHappenNext( this.props.reduxState.input );
      }
    }

    // when user types something
    // user typed will displayed
    // then the next thing will be triggered to display
      // be it outfit
      // or story

    updateUserInput = () => {

      console.log('START update user input' );
      // inputs are created on the fly, so collect as we go along
      let nextUserInput = this.props.reduxState.input;

      // put this is a var - not really a shallow copy, right? but wtvr
      // let stateUserInputList = this.state.userInputSoFar;

      let stateWhatsHappening = this.state.whatsHappening;

      // yay new div w newly entered text
      let uniqueKey = `${ this.state.userInputCount } ${nextUserInput}`;
      let newUserInputDiv = <div key={ uniqueKey }>--{ nextUserInput }</div>;

      let coolArray = stateWhatsHappening.concat( newUserInputDiv );

      // set for later!
      this.setState({
        // userInputSoFar: stateUserInputList.concat( newUserInputDiv ),
        userInputCount: this.state.userInputCount + 1,
        whatsHappening: coolArray,
        //whatsCount: this.state.whatsCount + 1
      });

      console.log('END update user input' );
    }
    
    // senario should be a generic thing that will print story, closet, outfit
    updateSenario = () => {
      // get the senario next in line
      // but beware we run out of senarios!
      if ( this.props.reduxState.senarioList.length < this.state.whatsCount + 1 ) {
        console.warn( 'ran out of senarios!' );
        return '';
      }

      // get the next in the list
      // AUDRY - let's just hit the server from now on?
      let nextSenario = this.props.reduxState.senarioList[ this.state.whatsCount ].senario;
      
      // let's shallow copy this
      let stateWhatsHappening = this.state.whatsHappening;

      // yay new div w newly entered text
      let uniqueKey = `${ this.state.senarioCount } ${nextSenario}`;
      let newSenarioDiv = <div key={ uniqueKey }>{ nextSenario }</div>;

      // set for later!
      this.setState({
        whatsHappening: stateWhatsHappening.concat( newSenarioDiv ),
        whatsCount: this.state.whatsCount + 1
      });
    }

    whatShallHappenNext = ( input ) => {

      this.updateUserInput();

      if ( input === 'outfit' ) {
        return this.getOutfit(); 
      }

      if ( input === 'k' ) {
        // get the next story piece
        return this.updateSenario();  
      }
    }

    getOutfit = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_OUTFIT', payload: this.state.userID });
    }
    
    render() {    
        return (
            <div className="storyBox">
                {/* we've got to tangle these out */}
                <div>{ this.state.whatsHappening }</div>
                {/* <div>{ this.state.senarioSoFar }</div>
                <div>{ this.state.userInputSoFar }</div> */}
            </div>
        );
    }
}

const mapStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapStateToProps )( Story );
