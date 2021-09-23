import { useState } from 'react';
import ShowSelfInfo from "./ShowSelfInfo";
import Findkid from './Findkid';
import GitLogin from "./GitLogin";
import LogoutBtn from './LogoutBtn';


//Show kid information on "profile" page.
export default function KidProfile({ isGetSelfInfo, kidId, code }) {

    const [pageIndex, setPageIndex] = useState(false) // click logout button, then jump to logout screen, not show kid profile any more.

    //after click logout button
    const logout = () => {
        alert(" Log out successful.")
        window.localStorage.clear()
        window.localStorage.setItem("Token", '-1')
        setPageIndex(!pageIndex)

    }

    return (
        <div className="container" style={{ minHeight: '39rem' }}>
            {
                //if click logout button, jump to welcome screen.otherwise, go to ShowSelfInfo component.
                pageIndex ?
                    <GitLogin />
                    :
                    <div className="row" >
                        {
                            //if isGetSelfInfo,code,kidId all exist, go to showselfinfo component.
                            (isGetSelfInfo
                                &&
                                (code ? code : window.localStorage.getItem("code"))
                                &&
                                kidId ? kidId : window.localStorage.getItem("kidId")
                            ) ?
                                <ShowSelfInfo id={kidId ? kidId : window.localStorage.getItem("kidId")} code={code ? code : window.localStorage.getItem("code")} /> :
                                <div></div>
                        }

                        {/* use kidid to get which kid is, get kid name and set to local storage. */}
                        {kidId ?
                            <Findkid id={kidId} /> :
                            ''}
                        {/* after login without jumpping to any page&& URL has code, the logout button will not show. */}
                        {
                            window.location.search.substring(1).split('&')[0].split('code=')[1] ?
                            '' :
                            <LogoutBtn logout={() => logout()} />
                        }
                       

                    </div>
            }

        </div>

    )
}
