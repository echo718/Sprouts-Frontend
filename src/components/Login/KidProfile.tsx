import { useState } from 'react';
import ShowSelfInfo from "./ShowSelfInfo";
import Findkid from './Findkid';
import GitLogin from "./GitLogin";
import { Login_AccessToken } from '../../apis/apis';
import { useMutation } from '@apollo/client';
import LogoutBtn from './LogoutBtn';


//use code from github to get two things from backend: token and kid's information.
export default function KidProfile(code) {

    const [kidId, setKidId] = useState()
    
    const [isGetSelfInfo, setIsGetSelfInfo] = useState(false)
    const [accessToken] = useMutation(Login_AccessToken)
    const [pageIndex, setPageIndex] = useState(false) // click logout button, then jump to logout screen, not show kid profile any more.

    // const  setCookie = (key, value, day, kidId) => {
    //     let expires = day
    //     let date = new Date(+ new Date() + expires) // curernt date add stored time
    //     document.cookie = `${key}*expires=${date.toUTCString()}*username=${kidId}`
    // }
//get token from backend
    const findCode = (props) => {
        if (props.code && (isGetSelfInfo === false)) {
            //open & close "personal information" bar
            setIsGetSelfInfo(!isGetSelfInfo)

           //get token from backend
            accessToken({ variables: { code: props.code } }).then(r => {
                if (r.errors) {
                        let err = r.errors.join("\n");
                        console.log(err)
                    return
                }
                if (r) {
                    setKidId(r.data.login.kid.id)

                    localStorage.setItem("Token", r.data.login.jwt)
                    localStorage.setItem("kidId", r.data.login.kid.id)
                    localStorage.setItem("gitHub", r.data.login.kid.gitHub)

                    isGetSelfInfo ? setIsGetSelfInfo(false) : setIsGetSelfInfo(true)
                    //will be expired after ten minutes 
                  //  setCookie(r.data.login.jwt, '', 60000, r.data.login.kid.id)

                }
            }).catch(reason => {
                    console.log(reason)
            })
        } 
    }
//after click logout button
    const logout = () => {
        localStorage.clear()
        localStorage.setItem("Token", '-1')
        alert(" Log out successful.")
        setPageIndex(true)
    }
      
    return (
        <div className="container" style={{ minHeight:'39rem'}}>
       
            {   //open 'personal information' bar directly
                findCode(code) 
            }
           
            {code ?
                window.localStorage.setItem("gitCode",code.code) :
               ''
            }

            {
                pageIndex ?
                    <GitLogin />
                    :
                    <div className="row" >

                        {
                           ( isGetSelfInfo 
                            &&
                             ( code ? code :window.localStorage.getItem("gitCode"))
                            && 
                            kidId ? kidId : window.localStorage.getItem("kidId")
                             ) ?
                                <ShowSelfInfo id={kidId ? kidId : window.localStorage.getItem("kidId") } code={code ? code :window.localStorage.getItem("gitCode")}/> :
                                <div></div>
                        }
                        
                        {kidId ?
                            <Findkid id={kidId} /> :
                            ''}

                        <LogoutBtn  logout={() => logout()} />

                    </div>
            }

        </div>

    )
}
