
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import AccessData from './components/StudyPlayground/AccessData';
import Footer from './components/footer';
import GameBase from './components/GameBase/GameBase';
import HomePage from './components/Home/HomePage';
import Login from './components/Login/Login';
import Nav from './components/Nav/nav';
import PrivateRoute from './components/Login/Privateroute';
import { BgProvider } from './components/Theme/BgProvider';
import { FontProvider } from './components/Theme/FontProvider';
interface RouteModel {
  path: string,
  component: any,
  name: string,
  exact: boolean
}

export const Routers: Array<RouteModel> = [
  { path: "/", component: HomePage, name: "homePage", exact: true },
  { path: "/AccessData", component: AccessData, name: "accessdata", exact: false },
  { path: '/GameBase', component: GameBase, name: "gamebase", exact: false },
  { path: '/login', component: Login, name: "login", exact: false }
]

function App() {
  return (
    <Router>
      <BgProvider  >
        <FontProvider>     
         <Nav />
        {
          <Switch>
            {
              Routers.map((route: RouteModel, index: number) => {
                if (route.path === '/AccessData') {

                  return (
                    <PrivateRoute
                      key={route.name}
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                    />
                  )
                } else {
                  return <Route
                    key={`${route.path}`}
                    path={`${route.path}`}
                    component={route.component}
                    exact={route.exact}
                  />;
                }
              })
            }
          </Switch>
        }


        <Footer />
        </FontProvider>
      </BgProvider>      
    </Router>

  );
}

export default App;
