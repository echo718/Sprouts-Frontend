import unnamed from '../../assets/unnamed.jpg';
import KidProfile from './KidProfile';
import React from 'react';

//get code from github after log in git hub.
export default function GitLogin() {

    const githubCode = window.location.search.substring(1).split('&')[0].split('code=')[1]
    

    const date = new Date()

    const Login = () => {
        
        const client_id = '519bd96d57a3139af825';
        const authorize_uri = 'https://github.com/login/oauth/authorize';
        const redirect_uri = 'http://localhost:3000/login';
        window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
        
    }

    const loginStyle = { backgroundImage: `url(${unnamed})`,width:"100%", height: "200px", paddingTop:"5%",textAlign:"center" } as const

    return (
        <div className="container">
            
            {/* code = true: logout;code = null: logout  */}
           
          
            {
                githubCode ?
                window.localStorage.setItem("code",githubCode)
                :''
            }
            {   //for first time login
              ( (githubCode?githubCode : window.localStorage.getItem("code") )  &&   localStorage.getItem("Token") !== '-1' ?
                    <div>
                        <KidProfile code={githubCode} />
                    </div>
                    :
                    (
                        //for "remember me" status login
                    (window.localStorage.getItem("Token") === '-1' || window.localStorage.getItem("Token") === '' ||

                        window.localStorage.getItem("kidId") !== (document.cookie ? document.cookie.split(';')[document.cookie.split(';').length-1].split('*')[2].split('username=')[1] : '')
                        || (
                            window.localStorage.getItem("kidId") === (document.cookie ? document.cookie.split(';')[document.cookie.split(';').length-1].split('*')[2].split('username=')[1] : '') && (
                                (document.cookie ? document.cookie.split(';')[document.cookie.split(';').length-1].split('*')[1].split('expires=')[1] : date.toUTCString()) < date.toUTCString())
                        )
                    )
                        ?

                        <div style={{ marginTop: "10%",padding:"0 30%"}}>
                            
                            <div style={loginStyle}>
                                <h2>Welcome</h2><br />
                                <button className="btn btn-outline-primary" onClick={Login} >Login with GitHub</button>
                                {window.localStorage.setItem("Token", '')}
                            </div>
                           
                        </div>
                        :
                        <div>
                            <KidProfile code={githubCode} />
                        </div>
                    )
               )
            }
        </div>

    )
}