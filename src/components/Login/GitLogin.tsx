import unnamed from '../../assets/unnamed.jpg';
import KidProfile from './KidProfile';
import React from 'react';

//get code from github after log in git hub website.
export default function GitLogin() {
    //get code from URL.
    const githubCode = window.location.search.substring(1).split('&')[0].split('code=')[1]
    
    const Login = () => {
        const client_id = '519bd96d57a3139af825';
        const authorize_uri = 'https://github.com/login/oauth/authorize';
        const redirect_uri = 'https://sproutsfrontend.azurewebsites.net/Gitlogin';
        window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    }

    const loginStyle = { backgroundImage: `url(${unnamed})`, width: "100%", height: "200px", paddingTop: "5%", textAlign: "center" } as const

    return (
        <div className="container">
            {/* if githubcode exist and not is null, will set this value to local storage "code" */}
            {
                githubCode ?
                    window.localStorage.setItem("code", githubCode)
                    : ''
            }
            {
                window.localStorage.getItem("Token")
            }
          
            {/* if code exist, show kid profile, otherwise, show login button;
                if not click logout button when closed chrome last time, will show kidprofile too*/}
            {
                ((window.localStorage.getItem("Token") !== '-1') && (githubCode ? githubCode : window.localStorage.getItem("code")))
                    ?
                    //show kid profile
                    <div>
                        <KidProfile code={githubCode} />
                    </div>
                    :
                    //if login not successful, not show kid profile, show login btn
                    <div style={{ marginTop: "10%", padding: "0 30%" }}>

                        <div style={loginStyle}>
                            <h2>Welcome</h2><br />
                            <button className="btn btn-outline-primary" onClick={Login} >Login with GitHub</button>
                            {window.localStorage.setItem("Token", '')}
                        </div>

                    </div>            
            }
        </div>

    )
}