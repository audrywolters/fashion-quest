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


const mapStateToProps = ( state ) => ({
  state
});

export default connect( mapStateToProps )( Story );
