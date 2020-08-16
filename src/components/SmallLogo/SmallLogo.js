import React, { Component } from 'react';
import '../SmallLogo/SmallLogo.css'

class SmallLogo extends Component {
    
    render() {
        return (

<div className="smallLogo">
{`
  //\\            ,,                                                   ,  
 ||    _         ||     '                                            ||  
=||=  < \\,  _-_, ||/\\\\ \\\\  /'\\\\ \\\\/\\\\        /'\\\\ \\\\ \\\\  _-_   -_,  =||= 
 ||   /-|| ||_.  || || || || || || ||       || || || || || \\ ||_.    ||  
 ||  (( ||  ~ || || || || || || || ||       || || || || ||/    ~ ||  ||  
 \\\\,  \\/\\\\ ,-_-  \\\\ |/ \\\\ \\\\,/  \\\\ \\\\       \\\\,|| \\\\/\\\\ \\\\,/  ,-_-   \\\\, 
                   _/                          ||                        
                                               ',/                       
`}
</div>

        );
    }
}

export default SmallLogo;