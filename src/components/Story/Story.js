import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
    state = {
        whatsHappening: [],
        whatsCount: 0
    }

    componentDidMount() {

      // AUDRY - to load a story item right away:
      // get story senario from userID = storyState (will equal senairo 5 or whatevs)

      // one shot get all story senarios - these won't change
      this.props.dispatch({ type: 'FETCH_SENARIO' });
      // set closet and outfit somehow w/o printing...
    }
    
    componentDidUpdate( prevProps ) {

      if ( prevProps.reduxState.change === 'change mode' &&
           prevProps.reduxState.input !== this.props.reduxState.input ) {
        // the user wants to update a clothing by ID
        this.whatShallHappenWhenChangeOutfit( this.props.reduxState.input );
      }

      // catch when new input is entered
      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {
        // how will we respond to the user
        this.whatShallHappenNext( this.props.reduxState.input );
      }

      if ( prevProps.reduxState.closet !== this.props.reduxState.closet ) {
        this.printCloset( this.props.reduxState.input );
      }

      if ( prevProps.reduxState.outfit !== this.props.reduxState.outfit ) {
        this.printOutfit( this.props.reduxState.input );
      }

      if ( prevProps.reduxState.allClothes !== this.props.reduxState.allClothes ) {
        this.calcChange();
      }

    }

    printUserInput = ( input ) => {

      // show what the user typed
      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ input }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv ]
      });
      
    }
    
    // don't have to getSenario as all are gotten in DidMount()
    printSenario = () => {
      
      // get the senario next in line
      // but beware we run out of senarios!
      if ( this.props.reduxState.senarioList.length < this.state.whatsCount + 1 ) {
        console.warn( 'ran out of senarios!' );
        return '';
      }

      // get the next in the list
      let nextSenario = this.props.reduxState.senarioList[ this.state.whatsCount ].senario;

      // yay new div w newly entered text
      let newSenarioDiv = <div key={ this.getNewKey() }>{ nextSenario }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newSenarioDiv ],
        whatsCount: this.state.whatsCount + 1
      });

      // clear so input will be checked even if it is the same thing typed
      this.props.dispatch({ type: 'UNSET_INPUT', payload: '' });
    }
  
    getNewKey = () => {
      return Math.random().toString(36).substr( 2, 20 );
    }

    getOutfit = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_OUTFIT' });
    }

    printOutfit = ( input ) => {
      let outfit = this.props.reduxState.outfit;
      let display = '';

      for ( let i of outfit ) {
        display += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }

      let newOutfitDiv = <div key={ this.getNewKey() }>{ display }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, input, newOutfitDiv ]
      });
    }

    getCloset = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_CLOSET' });
    }

    printCloset = ( input ) => {

      // yay new div w newly entered text
      let closet = this.props.reduxState.closet;
      let display = '';

      for ( let i of closet ) {
        display += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }

      let newClosetDiv = <div key={ this.getNewKey() }>{ display }</div>;
        
      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, input, newClosetDiv ]
      });
    }

    getAllClothes = () => {
      // saga, get all the clothes for this user
      this.props.dispatch({ type: 'FETCH_ALL_CLOTHES' });
    }

    calcChange = () => {
    
      const allClothes = this.props.reduxState.allClothes;
      const wearing = allClothes.filter( cloth => cloth.wearing );
      const choices = allClothes.filter( cloth => !cloth.wearing );

      this.printChangeChoice( wearing, choices );
    }

    printChangeChoice = ( wearing, choices ) => {

      // AUDRY - this could be done with redux closet/outfit
      // fix later
      let youWear = `You are wearing: \n`;
      for ( let i of wearing ) {
        youWear += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }
      youWear += '\n';

      let changeTo = `You can change into: \n`;
      for ( let i of choices ) {
        changeTo += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }
      changeTo += '\n';

      let youChooseDiv = <div key={ this.getNewKey() }>{ youWear + changeTo }</div>;
      let prompt = <div key={ this.getNewKey() }>Enter your choice #: </div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, youChooseDiv, prompt ]
      });

      this.props.dispatch({ type: 'SET_TO_CHANGE_MODE' });

    }

    whatShallHappenWhenChangeOutfit = ( input ) => {

      // check user choices out
      let changeIntoID = Number( input );

      if ( Number.isNaN( changeIntoID ) ) {
        console.warn( ':,( change outfit didnt understand the clothing ID: ', changeIntoID )
        return;
      }

      // now make sure it is in their closet     
      const have = this.props.reduxState.closet.find( cloth => cloth.id === changeIntoID );
      if ( !have ) {
        console.warn( ':,( change outfit couldnt find the clothing ID: ', changeIntoID );
        return;
      }
console.log('have ', have)
      // what clothing are we replacing
      // check by clothing type ( shirt or pants )
      const changeOutOf = this.props.reduxState.outfit.find( cloth => cloth.type === have.type );
  
      // make a nice object server can understand
      let updateData = {
        changeOutOf: changeOutOf.id, 
        changeInto: changeIntoID
      }

      // update it!
      this.props.dispatch({ type: 'CHANGE_OUTFIT', payload: updateData });
    }

    whatShallHappenNext = ( input ) => {
      
      this.printUserInput( input );

      switch ( input ) {
        case 'outfit':
          this.getOutfit( input );
          break;
        case 'closet':
          this.getCloset();
          break;
        case 'change':
          this.getAllClothes();
          break;
        case 'k':
          this.printSenario( input );
          break;
        
        default:
          // if (this.props.reduxState.change === 'change mode') {
          //   this.whatShallHappenWhenChangeOutfit( input );
          // }
          // do nothing
      }


    }

    render() {    
        return (
            <div className="storyBox">
              {/* all we are doing is printing the entire array each change */}
              { 
                this.state.whatsHappening.map( div => div )
              }
            </div>
        );
    }
}

const mapStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapStateToProps )( Story );
