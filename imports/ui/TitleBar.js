import React from 'react';
import PropTypes from 'prop-types';

// need to export TitleBar class
export default class TitleBar extends React.Component{ // jsx requires uppercase when working with components
  // by default react components only need to define one method and it is not the constructor
  // it is a render method - this returns the jsx that is returned to the screen
  render(){
    return (
      <div>
        {/*<h1>441 reddit</h1>*/}
        <h1>{this.props.title}</h1>
        {/* Challenge
          display a moderator for the 441 reddit page
          it should be required and should be a string

          in client/main.js
          modify <TitleBar title={title}/>
          in a manner necessary to have moderator's name show up under the title
        */}
        <p>moderator: {this.props.moderator}</p>
      </div>
    );
  }
  // the render() in combination with client/main.js is now making a real world Component
  // We can also set default values for prop and set the type a prop should be (string, num, function, etc)
  // Google react type checking props
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  // to use prop-types we need to update our npm
  // meteor npm install prop-types --save
};

TitleBar.propTypes = {// this equals an object
  title: PropTypes.string.isRequired, //throws warnings in browser when undefined or not string
  //useful if you didn't create the component and if you are tying to use it wrong
  moderator: PropTypes.string.isRequired,
};
/*
// the following overrides the propTypes / required. so we wont be using it
TitleBar.defaultProps = {
  title: 'Default title', //this removes the warning
};
*/
