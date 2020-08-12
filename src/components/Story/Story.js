import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
    state = {
        whatsHappening: [],
        whatsCount: 0
    }

    componentDidMount() {

      this.setState({
        userID: this.props.reduxState.user.id
      })

      // AUDRY - to load a story item right away:
      // get story senario from userID = storyState (will equal senairo 5 or whatevs)

      // one shot get all story senarios - these won't change during play
      this.props.dispatch({ type: 'FETCH_SENARIO' });
    }
    
    componentDidUpdate( prevProps ) {

      // catch when new input is entered
      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {
        console.log( 'in componentDidUpdate input' );
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
        this.calcChange( this.props.reduxState.input );
      }
    }

    printUserInput = ( input ) => {

      console.log(' print user input' );
      // show new user input!

      let newUserInputDiv = <div key={ this.getNewKey() }>--{ input }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newUserInputDiv ]
      });
      
      // AUDRY - doesn't work here - prints input and then an empty
      // this.props.dispatch({ type: 'SET_INPUT', payload: '' });
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
      // AUDRY - make this state
      let nextSenario = this.props.reduxState.senarioList[ this.state.whatsCount ].senario;

      // yay new div w newly entered text
      let newSenarioDiv = <div key={ this.getNewKey() }>{ nextSenario }</div>;

      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, newSenarioDiv ],
        whatsCount: this.state.whatsCount + 1
      });
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

      // erase so componentDidUpdate won't ignore us
      //this.props.dispatch({ type: 'SET_CLOSET', payload: [] });
    }

    getAllClothes = () => {
      // saga, get all the clothes for this user
      this.props.dispatch({ type: 'FETCH_ALL_CLOTHES' });
    }

    calcChange = ( input ) => {

      // AUDRY - i want to make a 'controller' method
      // with these methods inside
      // so it isn't a big long chain

      // AUDRY - this feels bug prone
      let type = 0;
      if ( input === 'change shirt' ) {
        type = 1;
      } else if ( input === 'change pants' ) {
        type = 2;
      }

      // AUDRY - make this a function
      const allClothes = this.props.reduxState.allClothes;
      const ourType = allClothes.filter( cloth => cloth.type === type );
      const wearing = ourType.filter( cloth => cloth.wearing );
      const choices = ourType.filter( cloth => !cloth.wearing );

      this.printChangeChoice( wearing, choices );
    }

    printChangeChoice = ( wearing, choices ) => {

      let w = {};
      if ( wearing.length === 1 ) {
        w = wearing[0];
      } else {
        console.warn( 'calcChange didnt find item user is wearing' );
      }

      let youWear = `You are wearing: \n${ w.icon } #${ w.id }: ${ w.color } . ${ w.fit } . ${ w.featureA } . ${ w.featureB } length \n\n`;
      let changeTo = `You can change into: \n`;
      for ( let i of choices ) {
        changeTo += `${ i.icon } #${ i.id }: ${ i.color } . ${ i.fit } . ${ i.featureA } . ${ i.featureB } length \n`
      }
      changeTo += '\n';

      let youChooseDiv = <div key={ this.getNewKey() }>{ youWear + changeTo }</div>;

      let prompt = <div key={ this.getNewKey() }>Enter your choice #: </div>;

      // i don't want this shit to trigger everything.
      // but I have to print the prompt



      // store/show everything that's happened
      this.setState({
        whatsHappening: [ ...this.state.whatsHappening, youChooseDiv, prompt ]
      });

      this.whatShallHappenWhenChangeOutfit();
    }

    whatShallHappenWhenChangeOutfit = () => {
        console.log( 'in whatShallHappenWhenChangeOutfit' );
    }

    whatShallHappenNext = ( input ) => {

      
      console.log( 'in whatShallHappenNext - input: ', input );


      switch ( input ) {
        case 'outfit':
          this.getOutfit( input );
          break;
        case 'closet':
          this.getCloset();
          break;
        case 'change shirt':

        // AUDRY - send to change controller
        // have to get clothes b4? how did this work... synchro
          this.getAllClothes();
          break;
        case 'k':
          this.printSenario( input ); 
          break;
        default:
          this.printUserInput( input );
      }
    }

    render() {    
        return (
            <div className="storyBox">
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
