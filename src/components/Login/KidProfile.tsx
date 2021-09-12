import { useState } from 'react';
import ShowSelfInfo from "./ShowSelfInfo";
import Findkid from './Findkid';
import GitLogin from "./GitLogin";
import { Login_AccessToken } from '../../apis/apis';
import { useMutation } from '@apollo/client';
import LogoutBtn from './LogoutBtn';


//use code from github to get token and kid information from backend.
export default function KidProfile(code) {

    const [kidId, setKidId] = useState()
    
    const [isGetSelfInfo, setIsGetSelfInfo] = useState(false)
    const [accessToken] = useMutation(Login_AccessToken)
  //  const [index, setIndex] = useState(0) //open "personal information" bar
    const [pageIndex, setPageIndex] = useState(false) // for log out jump to gitlogin

    const  setCookie = (key, value, day, kidId) => {
        //let expires = day * 86400 * 1000  // 时间转化成 ms
        let expires = day
        let date = new Date(+ new Date() + expires) // 当前时间加上要存储的时间
        document.cookie = `${key}*expires=${date.toUTCString()}*username=${kidId}`
    }

    const findCode = (props) => {
        if (props.code && (isGetSelfInfo === false)) {
            //open & close "personal information" bar
            setIsGetSelfInfo(!isGetSelfInfo)
           
          //  if (index === 0) {

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
                     

                        setCookie(r.data.login.jwt, '', 60000000, r.data.login.kid.id)

                    }
                }).catch(reason => {
                     console.log(reason)
                })

        } 
    }
   

    const logout = () => {
        // localStorage.setItem("KidId", '-1')
        // localStorage.setItem("KidName", '-1')
        // localStorage.setItem("gitCode", '-1')
        localStorage.clear()
        localStorage.setItem("Token", '-1')
        alert(" Log out successful.")
        setPageIndex(true)
    }
      
    return (
        <div className="container" style={{ minHeight:'39rem'}}>
       
            {   //open 'personal information' bar directly
             //   index === 0 ?
                    findCode(code) 
                  // : ''
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
