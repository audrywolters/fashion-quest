import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';
import SmallLogo from '../SmallLogo/SmallLogo';

class Story extends Component {
  
    state = {
        whatsHappening: [],
        whatsCount: 0,
        userInput: '',
        mode: ''
    }

    componentDidMount() {

      // AUDRY - to load a story item right away:
      // get story senario from userID = storyState (will equal senairo 5 or whatevs)

      // one shot get all story senarios - these won't change
      this.props.dispatch({ type: 'FETCH_SENARIO' });

      // load initial clothing into redux (these can change)
      this.getOutfit();
      this.getCloset();
      this.getNewClothing();
    }
    
    componentDidUpdate( prevProps ) {

      // keep shiv updated
      this.getOutfit();
      this.getCloset();
      this.getNewClothing();

      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {

        let userInput = this.props.reduxState.input;
       
        // always show what the user has typed
        this.printUserInput( userInput );

        if ( this.state.mode === 'change' ) {
          this.setOutfit();
        }

        if ( this.state.mode === 'donate' ) {
          this.setDonate();
        }

        switch ( userInput ) {
          case 'change': // update a clothing by ID
            this.setState({
              mode: 'change'
            })
            this.printChange( userInput );
            break;
          case 'closet': // what clothes do we have?
            this.getCloset();
            this.printCloset( userInput );
            break;
          case 'donate': // delete a clothing by ID
            this.setState({
              mode: 'donate'
            })
            this.printDonate( userInput );
            break;
          case 'k': // story time!
            this.printSenario( userInput );
            break;
          case 'outfit': // look at the outfit
            this.getOutfit();
            this.printOutfit( userInput );
            break;
          default:
            // ?
        }

        // clear so input will be checked even if it is the same thing typed
        this.props.dispatch({ type: 'UNSET_INPUT', payload: '' });      
      }
    }

    //#region GET
    // getAllClothes = () => {
    //   // saga, get all the clothes for this user
    //   this.props.dispatch({ type: 'FETCH_ALL_CLOTHES' });
    // }

    getCloset = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_CLOSET' });
    }
    
    getNewClothing = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_NEW_CLOTHING' });
    }

    getOutfit = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_OUTFIT' });
    }
    //#endregion

    //#region SET
    setDonate = () => {

      // check user choices out
      let removeID = Number( this.props.reduxState.input );

      if ( Number.isNaN( removeID ) ) {
        console.warn( ':,( Donate outfit didnt Understand the clothing ID: ', removeID )
        return;
      }

      // now make sure it is in their closet     
      const have = this.props.reduxState.closet.find( cloth => cloth.id === removeID );
      if ( !have ) {
        console.warn( ':,( Donte outfit couldnt Find the clothing ID: ', removeID );
        return;
      }

      // make a nice object server can understand
      let updateData = {
        removeID: removeID
      }

      // update it!
      this.props.dispatch({ type: 'DONATE', payload: updateData });

      this.setState({
        mode: ''
      });
    }

    setNewClothing = ( newClothingID ) => {
      
      if ( Number.isNaN( newClothingID ) ) {
        console.warn( ':,( New clothing didnt Understand the clothing ID: ', newClothingID )
        return;
      }

      // make a nice object server can understand
      let updateData = {
        newClothingID: newClothingID
      }

      // update it!
      this.props.dispatch({ type: 'ADD_NEW_CLOTHING', payload: updateData });
    }

    setOutfit = () => {
      // check user choices out
      let changeIntoID = Number( this.props.reduxState.input );

      if ( Number.isNaN( changeIntoID ) ) {
        console.warn( ':,( change outfit didnt Understand the clothing ID: ', changeIntoID )
        return;
      }

      // now make sure it is in their closet     
      const have = this.props.reduxState.closet.find( cloth => cloth.id === changeIntoID );
      if ( !have ) {
        console.warn( ':,( change outfit couldnt Find the clothing ID: ', changeIntoID );
        return;
      }

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

      this.setState({
        mode: ''
      });
    }
    //#endregion

    //#region PRINT
    printChange = ( userInput ) => {
      
      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ userInput }</div>;

      const wearing = this.props.reduxState.outfit;
      const choices = this.props.reduxState.closet;

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
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv, youChooseDiv, prompt ]
      });
    }

    printCloset = ( userInput ) => {

      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ userInput }</div>;

      // yay new div w newly entered text
      let closet = this.props.reduxState.closet;
      let display = '';

      for ( let i of closet ) {
        display += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }

      let newClosetDiv = <div key={ this.getNewKey() }>{ display }</div>;
        
      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv, newClosetDiv ]
      });
    }

    printDonate = ( userInput ) => {

      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ userInput }</div>;

      const choices = this.props.reduxState.closet;

      let donatableClothes = `What would you like to donate: \n`;
      for ( let i of choices ) {
        donatableClothes += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }
      donatableClothes += '\n';

      let youChooseDiv = <div key={ this.getNewKey() }>{ donatableClothes }</div>;
      let prompt = <div key={ this.getNewKey() }>Enter your choice #: </div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv, youChooseDiv, prompt ]
      });
    }

    printNewClothing = () => {

      let n = this.props.reduxState.newClothing;
      let foundNewItem = `\nHey you found clothes in a garbage can!\n`
      foundNewItem += `${ n.icon } #${ n.id }: ${ n.color } . ${ n.fit } . ${ n.featureA } . ${ n.featureB } length \n`;
      foundNewItem += `Cool let\'s keep it.`;
      let foundNewItemDiv = <div key={ this.getNewKey() }>{ foundNewItem }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, foundNewItemDiv ]
      });

      this.setNewClothing(n.id);
    }

    printOutfit = ( userInput ) => {

      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ userInput }</div>;

      let outfit = this.props.reduxState.outfit;
      let display = '';

      for ( let i of outfit ) {
        display += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }

      let newOutfitDiv = <div key={ this.getNewKey() }>{ display }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv, newOutfitDiv ]
      });
    }

    printSenario = ( userInput ) => {
      
      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ userInput }</div>;

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
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv, newSenarioDiv ],
        whatsCount: this.state.whatsCount + 1
      });

      // AUDRY - HACK - add bool flag to senario table?
      if ( nextSenario === 'you found an item') {
        this.printNewClothing();
      }
    }

    printUserInput = ( userInput ) => {
      // show what the user typed
      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ userInput }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv ]
      });
    }
    //#endregion

    //#region HELPERS
    getNewKey = () => {
      return Math.random().toString(36).substr( 2, 20 );
    }
    //#endregion
  
    render() {    
        return (
          <>
            <SmallLogo />
            <div className="storyBox">
              {/* all we are doing is printing the entire array each change */}
              { 
                this.state.whatsHappening.map( div => div )
              }
            </div>
          </>
        );
    }
}

const mapStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapStateToProps )( Story );
