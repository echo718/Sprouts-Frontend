import unnamed from '../../assets/unnamed.jpg';
import KidProfile from './KidProfile';
import { Login_AccessToken } from '../../apis/apis';
import { useMutation } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';

//get code and token.
export default function GitLogin() {
    //get code from URL.
    const githubCode = window.location.search.substring(1).split('&')[0].split('code=')[1]

    const [isGetSelfInfo, setIsGetSelfInfo] = useState(false)
    const [accessToken] = useMutation(Login_AccessToken)
    const [kidId, setKidId] = useState('1')

    //get token 
    const findtoken = useCallback(
        () => {
            console.log("findtoken", githubCode, isGetSelfInfo)

            //if code exist and haven't get self kid information, will execute blow code.
            if (githubCode && (!isGetSelfInfo === true)) {
                //open & close "personal information" bar
                setIsGetSelfInfo(!isGetSelfInfo)
                console.log("findtoken1", githubCode)
                //get token from backend
                accessToken({ variables: { code: githubCode } }).then(r => {
                    if (r.errors) {
                        console.log("findtoken2", githubCode)
                        let err = r.errors.join("\n");
                        console.log(err)
                        alert("Remote Server Error! Please try to login again.")
                        return
                    }
                    if (r) {
                        console.log("findtoken3", githubCode,isGetSelfInfo)
                        
    
                        localStorage.setItem("Token", r.data.login.jwt)
                        localStorage.setItem("kidId", r.data.login.kid.id)
                        localStorage.setItem("gitHub", r.data.login.kid.gitHub)
    
                       // isGetSelfInfo ? setIsGetSelfInfo(false) : setIsGetSelfInfo(true)
                        console.log("get token",isGetSelfInfo, localStorage.getItem("Token"))
                   
                        if(kidId){setKidId(r.data.login.kid.id)}
                      
                    }
                }).catch(reason => {
                    console.log("findtoken4", githubCode)
                    console.log(reason)
                })
                console.log("gettoken")
            }
            }
        ,
        [githubCode, isGetSelfInfo, accessToken,kidId],
    )

    useEffect(() => {
        console.log("here go to useeffect")
        //save githubcode to localstorage
        if (githubCode) {
            if (githubCode !== window.localStorage.getItem("code")) {
                window.localStorage.setItem("code", githubCode)
            }
        }

        //avoid re-render
        if (window.localStorage.getItem("Token")) {
            console.log("useEffect token")
            return;
        }
        findtoken()
        console.log("Useeffect", githubCode, isGetSelfInfo, window.localStorage.getItem("code"), window.localStorage.getItem("Token"))
    }, [githubCode, findtoken, isGetSelfInfo]
    )

    const Login = () => {
        const client_id = '519bd96d57a3139af825';
        const authorize_uri = 'https://github.com/login/oauth/authorize';
        const redirect_uri = 'https://sproutsfrontend.azurewebsites.net/Gitlogin';
        //const redirect_uri = 'http://localhost:3000/Gitlogin'
        window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
        // setIsGetSelfInfo(!isGetSelfInfo)
    }

    const loginStyle = { backgroundImage: `url(${unnamed})`, width: "100%", height: "200px", paddingTop: "5%", textAlign: "center" } as const

    return (

        <div className="container" style={{ minHeight: '30rem' }}>
            {
                <div>
                    {/* if code exist and hasnot log out, go to access token. */}
                    {console.log("render", isGetSelfInfo,window.localStorage.getItem("Token"))}

                    {
                        githubCode && (window.localStorage.getItem("Token") !== '-1') && isGetSelfInfo ?
                            findtoken() : ''
                    }
                   

                    {/* if localstorage donot have code,and code is not -1, githubcode will store value to loalstorage. */}
                    {
                        githubCode ?
                            (
                                githubCode !== window.localStorage.getItem("code") ?
                                    window.localStorage.setItem("code", githubCode) : ''
                            ) : ''
                    }

                    {/* if code exist, show kid profile, otherwise, show login button;
if not click logout button when closed chrome last time, will show kidprofile too*/}
                    {
                        (githubCode ? githubCode : window.localStorage.getItem("code"))
                            && (window.localStorage.getItem("Token") !== '-1') && true
                            ?
                            //show kid profile
                            <div>
                                <KidProfile isGetSelfInfo={isGetSelfInfo} kidId={localStorage.getItem("kidId")} code={githubCode} />
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
            }

        </div>


    )
}