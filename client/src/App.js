// packages
import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Landing from './components/Landing';
// Styles
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Reduc related
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <section className="container">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
