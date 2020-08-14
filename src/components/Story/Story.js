import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

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
      this.getAllClothes();
      this.getOutfit();
      this.getCloset();
    }
    
    componentDidUpdate( prevProps ) {

      // console.log( 'prevProps.reduxState.input: ', prevProps.reduxState.input );
      // console.log( 'this.props.reduxState.input: ', this.props.reduxState.input );
      
      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {

        this.setState({
          userInput: this.props.reduxState.input
        })
        
        // always show what the user has typed
        this.printUserInput( this.state.userInput );

        if ( this.state.mode === 'change' ) {
          this.setOutfit();
        }

        if ( this.state.mode === 'donate' ) {
          this.setDonate();
        }

        switch ( this.state.userInput ) {
          case 'change': // update a clothing by ID
            this.setState({
              mode: 'change'
            })
            this.printChange();
            break;
          case 'closet': // what clothes do we have?
            this.getCloset();
            this.printCloset();
            break;
          case 'donate': // delete a clothing by ID
            this.setState({
              mode: 'donate'
            })
            this.printDonate();
            break;
          case 'k': // story time!
            this.printSenario();
            break;
          case 'outfit': // look at the outfit
            this.getOutfit();
            this.printOutfit();
            break;
          default:
            // ?
        }

        // AUDRY - don't know if this is ok here...
        // clear so input will be checked even if it is the same thing typed
        this.props.dispatch({ type: 'UNSET_INPUT', payload: '' });      
      }
    }

    //#region GET
    getAllClothes = () => {
      // saga, get all the clothes for this user
      this.props.dispatch({ type: 'FETCH_ALL_CLOTHES' });
    }

    getCloset = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_CLOSET' });
    }

    getOutfit = () => {
      // ask saga to help us do it
      this.props.dispatch({ type: 'FETCH_OUTFIT' });
    }
    //#endregion

    //#region SET
    setDonate = () => {      
      this.getAllClothes();
      this.getCloset();
      this.getOutfit();


      // check user choices out
      let removeID = Number( this.state.userInput );

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
        
      this.getAllClothes();
      this.getCloset();
      this.getOutfit();
    }

    setOutfit = () => {
      this.getAllClothes();
      this.getCloset();
      this.getOutfit();


      // check user choices out
      let changeIntoID = Number( this.state.userInput );

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
        
      this.getAllClothes();
      this.getCloset();
      this.getOutfit();
    }
    //#endregion

    //#region PRINT
    printChange = () => {

      const allClothes = this.props.reduxState.allClothes;
      const wearing = allClothes.filter( cloth => cloth.wearing );
      const choices = allClothes.filter( cloth => !cloth.wearing );

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
    }

    printCloset = () => {

      // yay new div w newly entered text
      let closet = this.props.reduxState.closet;
      let display = '';

      for ( let i of closet ) {
        display += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }

      let newClosetDiv = <div key={ this.getNewKey() }>{ display }</div>;
        
      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, this.state.userInput, newClosetDiv ]
      });
    }

    printDonate = () => {
      const allClothes = this.props.reduxState.allClothes;
      const choices = allClothes.filter( cloth => !cloth.wearing );

      let donatableClothes = `What would you like to donate: \n`;
      for ( let i of choices ) {
        donatableClothes += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }
      donatableClothes += '\n';

      let youChooseDiv = <div key={ this.getNewKey() }>{ donatableClothes }</div>;
      let prompt = <div key={ this.getNewKey() }>Enter your choice #: </div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, youChooseDiv, prompt ]
      });

      // this.setSt
      // this.props.dispatch({ type: 'SET_TO_DONATE_MODE' });
    }

    printOutfit = () => {

      let outfit = this.props.reduxState.outfit;
      console.log('outfit: ', outfit);
      let display = '';

      for ( let i of outfit ) {
        display += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }

      let newOutfitDiv = <div key={ this.getNewKey() }>{ display }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, this.state.userInput, newOutfitDiv ]
      });

    }

    printSenario = () => {
      
      // get the senario next in line
      // but beware we run out of senarios!
      if ( this.props.reduxState.senarioList.length < this.state.whatsCount + 1 ) {
        console.warn( 'ran out of senarios!' );
        return '';
      }

      // AUDRY
      // this should be in the state
      // redux has the senarios - don't need to live in state too
      // get the next in the list
      let nextSenario = this.props.reduxState.senarioList[ this.state.whatsCount ].senario;

      // yay new div w newly entered text
      let newSenarioDiv = <div key={ this.getNewKey() }>{ nextSenario }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newSenarioDiv ],
        whatsCount: this.state.whatsCount + 1
      });

      // AUDRY - ok here???
      // clear so input will be checked even if it is the same thing typed
      this.props.dispatch({ type: 'UNSET_INPUT', payload: '' });
    }

    printUserInput = () => {
      // show what the user typed
      let newUserInputDiv = <div key={ this.getNewKey() } className="userInput">{ this.state.userInput }</div>;

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
