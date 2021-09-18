
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import navlogo from "../../assets/navlogo.png";
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse } from 'bootstrap/dist/js/bootstrap';
import { BgContext } from '../Theme/BgProvider';
import { FontContext } from '../Theme/FontProvider';

export default function Nav() {

    const [toggle, setToggle] = useState(false)//used to show drop list for collapse.
    // design theme using context hook
    const [bgcolor, setBgColor] = useContext(BgContext);
    const [fontcolor, setFontColor] = useContext(FontContext);
    const [dropdownName, setDropdownName] = useState('Theme')

    //collapse has drop list
    useEffect(() => {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, { toggle: false })
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })

    const navlogoStyle = { height: "70px", borderRadius: "0 0 50% 0" }

    const logo = { color: "white", width: "300px", height: "65px", paddingLeft: "5%" }

    //different themes:Maroon,Teal and transparent
    const darkTheme = () => {
         setBgColor('Maroon')
         setFontColor('white')
        setDropdownName('Maroon Theme')
    }
    const lightTheme = () => {
        setBgColor('Teal')
        setFontColor('silver')
        setDropdownName('Teal Theme')
    }
    const regularTheme = () => {
        setBgColor('transparent')
        setFontColor('black')
        setDropdownName('Standard Theme')
    }

    return (
        < React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: bgcolor }}>
                <a className="navbar-brand" href="/">
                    <div style={logo}>
                        <img src={navlogo} alt="" style={navlogoStyle} />
                    </div>
                </a>
                <button className="navbar-toggler" type="button" onClick={() => setToggle(toggle => !toggle)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapseTarget">
                    <ul className="navbar-nav mr-auto "  >
                        <li className="nav-item active navStyle m-2" >
                            <Link className="nav-link " to="/" style={{ color: fontcolor }}>Home</Link>
                        </li>
                        <li className="nav-item navStyle m-2"  >
                            <Link className="nav-link " style={{ color: fontcolor }} to="/AccessData">Study Playground </Link>
                        </li>
                        <li className="nav-item navStyle m-2" >
                            <Link className="nav-link " style={{ color: fontcolor }} to="/GameBase" >Game Base</Link>
                        </li>
                        <li className="nav-item navStyle m-2">
                            <Link className="nav-link " style={{ color: fontcolor }} to="/Gitlogin" >
                                {window.localStorage.getItem("Token") === '-1' || window.localStorage.getItem("Token") === null || window.localStorage.getItem("Token") === '' ?
                                    "Login" :
                                    "My Profile"
                                }
                            </Link>
                        </li>
                        <li className="nav-item dropdown   m-2">
                            <a className="nav-link dropdown-toggle navStyle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: fontcolor }}>
                                {dropdownName}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown"  style={{ backgroundColor: bgcolor }}>
                                <li style={{ color: fontcolor }} >
                                    <button className="dropdown-item" onClick={darkTheme} >Maroon Theme</button>
                                </li>
                                <li style={{ color: fontcolor }} >
                                    <button className="dropdown-item" onClick={lightTheme} >Teal Theme</button>
                                </li>
                                <li  style={{ color: fontcolor }}>
                                    <button className="dropdown-item" onClick={regularTheme}>Standard Theme</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </  React.Fragment>
    )
}
