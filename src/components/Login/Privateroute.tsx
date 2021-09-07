
import { Route, Redirect } from 'react-router-dom';
import AccessData from '../StudyPlayground/AccessData';

// if click "study playground", login state will be checked, if not login yet, will jump to log in page.
const PrivateRoute = ({component: Component, ...props}) => {
  
   
    return <Route {...props} render={(p) => {

        const token =   window.localStorage.getItem("Token")
        
        if (token ){ // login succussful.
            return <AccessData />     
        } else { // jump to login page
            alert("Please login first!")
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: p.location.pathname
                }
            }}/>
        }
        
    }}/>
}
export default PrivateRoute
