import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import loginbanner from '../../assets/loginbanner.jpg';
import gamebanner from '../../assets/gamebanner.jpg';
import studybanner from '../../assets/studybanner.jpg';
import '../../App.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const carouselStyle = { margin: "auto 20%",minHeight:'39rem' }
    const contentStyle = { width:"100%", color: "yellow" } as const
    const imgStyle = { width: "100%", height: "30em" }   

    return (
        <React.Fragment>
            <div style={carouselStyle}>
                <Carousel autoplay>
                    <div style={contentStyle} >
                        <Link to="/AccessData">
                            <img src={studybanner} style={imgStyle} alt="studybanner" />
                            <div className="homepageH3">Build your study playground now!</div>
                        </Link>

                    </div>
                    <div style={contentStyle}>
                        <Link to="/GameBase">
                            <img src={gamebanner} style={imgStyle} alt="gamebanner" />
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



