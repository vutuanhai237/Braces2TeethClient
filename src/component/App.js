import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React  from 'react';
import Home from './page/Home'
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