import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../Story/Story.css';

class Story extends Component {
  
  render() {
    return (
      <>
        <div className="storyBox">Here is the story</div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = ( state ) => ({
  state
});

// this allows us to use <App /> in index.js
export default connect( mapStateToProps )( Story );
