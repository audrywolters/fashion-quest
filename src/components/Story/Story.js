import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
    state = {
        userID: 0,
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
      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {

        // how will we respond to the user
        this.whatShallHappenNext( this.props.reduxState.input );
      }
    }

    updateUserInput = () => {

      // inputs are created on the fly, so collect as we go along
      let nextUserInput = this.props.reduxState.input;

      // shallow copy
      let stateWhatsHappening = this.state.whatsHappening;

      // yay new div w newly entered text
      let key = Math.random().toString(36).substr( 2, 20 );
      let newUserInputDiv = <div key={ key }>--{ nextUserInput }</div>;

      let coolArray = stateWhatsHappening.concat( newUserInputDiv );

      // set for later!
      this.setState({
        whatsHappening: coolArray
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

      // yay new div w newly entered text;
      let key = Math.random().toString(36).substr( 2, 20 );
      let newSenarioDiv = <div key={ key }>{ nextSenario }</div>;

      // set for later!
      this.setState({
        whatsHappening: stateWhatsHappening.concat( newSenarioDiv ),
        whatsCount: this.state.whatsCount + 1
      });
    }

    getOutfit = () => {
      // ask saga to help us do it

      // AUDRY - async!
      this.props.dispatch({ type: 'FETCH_OUTFIT', payload: this.state.userID });

      // let's shallow copy this
      let stateWhatsHappening = this.state.whatsHappening;


      // yay new div w newly entered text
      let o = this.props.reduxState.outfit;
      let display = '';

      for ( let i of o ) {
        display += `${ i.icon } | color: ${ i.color } fit: ${ i.fit } 1: ${ i.featureA } 2: ${ i.featureB }`
      }

      let key =  Math.random().toString(36).substr( 2, 20 );
      let newOutfitDiv = <div key={ key }>{ display }</div>;

      // set for later!
      this.setState({
        whatsHappening: stateWhatsHappening.concat( newOutfitDiv )
      });
    }

    getCloset = () => {
      // ask saga to help us do it

      // AUDRY - async!
      this.props.dispatch({ type: 'FETCH_CLOSET', payload: this.state.userID });

      // let's shallow copy this
      let stateWhatsHappening = this.state.whatsHappening;

      // yay new div w newly entered text
      let c = this.props.reduxState.closet;
      let display = '';

      for ( let i of c ) {
        display += `${ i.icon } | color: ${ i.color } fit: ${ i.fit } 1: ${ i.featureA } 2: ${ i.featureB }`
      }
      let key =  Math.random().toString(36).substr( 2, 20 );
      let newClosetDiv = <div key={ key }>{ display }</div>;

      // set for later!
      this.setState({
        whatsHappening: stateWhatsHappening.concat( newClosetDiv )
      });
    }

    whatShallHappenNext = ( input ) => {

      this.updateUserInput();

      if ( input === 'outfit' ) {
        this.getOutfit();
        return;
      }

      if ( input === 'closet' ) {
        this.getCloset();
        return;
      }

      if ( input === 'k' ) {
        // get the next story piece
        return this.updateSenario();  
      }
    }

    render() {    
        return (
            <div className="storyBox"> { this.state.whatsHappening } </div>
        );
    }
}

const mapStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapStateToProps )( Story );
