import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import homecontent3 from '../../assets/homecontent3.jpg';
import homecontent1 from '../../assets/homecontent1.jpg';
import homecontent2 from '../../assets/homecontent2.jpg';
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
                        </Link>

                    </div>
                    <div style={contentStyle}>
                        <Link to="/GameBase">
                            <img src={homecontent2} style={imgStyle} alt="gamebanner" />
                        </Link>

                    </div>
                    <div style={contentStyle}>
                        <Link to="/Login">
                            <img src={homecontent3} style={imgStyle} alt="loginbanner" />
                        </Link>

                    </div>
                </Carousel>
            </div>
        </React.Fragment>

    )
}



