import "../App.css";
import React, { useContext  } from 'react';
import { BgContext } from './Theme/BgProvider';
import { FontContext } from './Theme/FontProvider';


const Footer = () => {

    const [bgcolor] = useContext(BgContext);
    const [fontcolor] = useContext(FontContext);
   
    return (
        <div className="footer"  style={{ backgroundColor:bgcolor}}>
           
            <a
                className="App-link"
                href="http://192.168.1.67:3000"
                target="_self"
                 style={{ color:fontcolor }}
               // rel="noopener noreferrer"
            >
                Learn More
            </a>
        </div>
    )
}

export default Footer
