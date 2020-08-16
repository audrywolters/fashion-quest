import React, { Component } from 'react';
import '../BigLogo/BigLogo.css';

class BigLogo extends Component {
    
    render() {
        return (

// this looks crazy because we have to escape all the 'escape' forward slashes
<pre className="bigLogo">
{`
        ____,
      _/--
    ,||-
   ,|/
 __||-__-'            //
'  |||     _         ||    ^
   |||    <_\\,  _-_, ||/\\\\ \\\\  /'\\\\ \\\\/\\\\
   |||    / || ||_.  || || || || || || ||
   |||   (( ||  ~ || || || || || || || ||
   |||   \\/\\\\  ,-_-  \\\\ |/ \\\\ \\\\,/  \\\\ \\\\  
   |||        
   |||    _-^_                        /
   ||/   (/  \\)                      ||
   |,   (|  , |)  \\\\ \\\\  _-_   _-_, =||=
 _-/    (|  \\ |)  || || || \\\\ ||_.   ||
         (  \\\\ )  || || ||/    ~ ||  ||
          \\_ \\)   \\\\/\\\\  \\\\,/ ,-_-   \\\\/
           _-/
`}
</pre>

        );
    }
}

export default BigLogo;
