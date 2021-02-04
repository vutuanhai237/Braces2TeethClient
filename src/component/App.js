import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React  from 'react';
import Home from './page/Home'
import ProcessVideo from './page/ProcessVideo'
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/process' component={Home} />
                <Route exact path='/processvideo' component={ProcessVideo} />                    
            </Switch>
            <div className='App'></div>
        </Router >
    );
}

export default App;