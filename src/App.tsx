
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccessData from './components/StudyPlayground/AccessData';
import Footer from './components/footer';
import GameBase from './components/GameBase/GameBase';
import HomePage from './components/Home/HomePage';
import GitLogin from './components/Login/GitLogin';
import Nav from './components/Nav/nav';
import PrivateRoute from './components/Login/Privateroute';//if not login, the "study playground" page will not allow to show.
import { BgProvider } from './components/Theme/BgProvider';// theme
import { FontProvider } from './components/Theme/FontProvider';// theme

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
  { path: '/GitLogin', component: GitLogin, name: "gitLogin", exact: false }
]

function App() {
  return (
    <Router>
      {/* for different themes */}
      <BgProvider  >
        <FontProvider>
          <Nav />
          {
            //router
            <Switch>
              {
                Routers.map((route: RouteModel, index: number) => {
                  // if go to "study playground" page, will check if login successcully.
                  // if not login, will jump to login page directly.
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
