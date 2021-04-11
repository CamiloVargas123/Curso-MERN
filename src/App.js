import React, {Suspense} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/Router";
import {LoadingOutlined} from "@ant-design/icons";

import AuthProvider from "./providers/AuthProviders";


import './App.scss';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<IsLoading />} >
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

function IsLoading(){
  return(
    <div className="isloading">
      <LoadingOutlined className="loading" style={{fontSize: 100}} />
    </div>
  )
}

export default App;
