import React, {Suspense} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/Router";

import AuthProvider from "./providers/AuthProviders";


import './App.scss';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading page....</div>}>
          <Switch>
            {routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route){
  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
