import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
    state = {
        senarioList: []
    }

    componentDidMount() {
    }
    
    // catch when new input is entered
    componentDidUpdate ( prevProps ) {
      if ( prevProps.reduxState.input !== this.props.reduxState.input ) {
        
        this.whatShallHappenNext();
      }
    }

    whatShallHappenNext = () => {
        console.log('hi it caught it');
    }



    // this is very silly and can only be prompted by
    // a user event 
    // it should fire after an input is inputed
    // or for the begining, componentDidMount....
    // what if they reload???
    printSenario = () => {
       
        // prepare to add a new senario to the DOM
        // make vars easy to read
        const senarioList = this.props.reduxState.senarioList;
        const length = this.props.reduxState.senarioList.length - 1;

        this.setState({
            senarioList: senarioList,
            currentSenario: senarioList[ length ]
        });

        console.log('curr senar',  this.state.currentSenario );
    }
    
    render() {    
        return (
            <div className="storyBox">
                <div>{ this.state.currentSenario }</div>
                <button onClick={ this.printSenario }>Add a Senario!</button>
                <div>{ this.props.reduxState.input }</div>
            </div>
        );
    }
}

const mapStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapStateToProps )( Story );
