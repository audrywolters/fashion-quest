import React, { Component } from 'react';

class FQBigLogo extends Component {
    
    render() {
        return (

// this looks crazy because we have to escape all the 'escape' forward slashes
<pre className="fqBigLogo">
{`
    _/                                 
  ,--
 _||_              //
' ||    _          ||     '             
  ||    <_\\,  _-_, ||/\\\\ \\\\  /'\\\\ \\\\/\\\\ 
  ||    / || ||_.  || || || || || || || 
  ||   (( ||  ~ || || || || || || || || 
  ||   \\/\\\\  ,-_-  \\\\ |/ \\\\ \\\\,/  \\\\ \\\\
  |, 
_-/      _
       ,- -,                       ,
      ('   ')                     ||
     ((     )) \\\\ \\\\  _-_   _-_, =||=
     (( ||  )) || || || \\\\ ||_.   ||
      (  \\\\ )  || || ||/    ~ ||  ||
       \\_ \\)   \\\\/\\\\  \\\\,/ ,-_-   \\\\,
         _//
`}
</pre>

        );
    }
}

export default FQBigLogo;
