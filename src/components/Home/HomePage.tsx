import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import loginbanner from '../../assets/loginbanner.jpg';
import homecontent1 from '../../assets/homecontent1.PNG';
import homecontent2 from '../../assets/homecontent2.PNG';
import '../../App.css';
import { Link } from 'react-router-dom';

//a carousel shows here, when click each picture, will link to different pages using router 
export default function HomePage() {
    const carouselStyle = { margin: "auto 20%",minHeight:'39rem' }
    const contentStyle = { width:"100%", color: "yellow" } as const
    const imgStyle = { width: "100%", height: "30esm" }   

    return (
        <React.Fragment>
            <div style={carouselStyle}>
               
                <Carousel autoplay>
                    <div style={contentStyle} >
                        <Link to="/AccessData">
                            <img src={homecontent1} style={imgStyle} alt="studybanner" />
                            <div className="homepageH3">Build your study playground now!</div>
                        </Link>

                    </div>
                    <div style={contentStyle}>
                        <Link to="/GameBase">
                            <img src={homecontent2} style={imgStyle} alt="gamebanner" />
                            <div className="homepageH3" >Win the number game here!</div>
                        </Link>

                    </div>
                    <div style={contentStyle}>
                        <Link to="/Login">
                            <img src={loginbanner} style={imgStyle} alt="loginbanner" />
                            <div className="homepageH3" >Login now.</div>
                        </Link>

                    </div>
                </Carousel>
            </div>
        </React.Fragment>

    )
}



