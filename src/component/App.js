
import Home from './page/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component }  from 'react';
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />       
            </Switch>
            <div className="App"></div>
        </Router >
    );
}

export default App;



