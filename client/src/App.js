// packages
import React, { Fragment, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/Alert';
import ProtectedRoutes from './components/ProtectRoutes';
import Dashboard from './components/Dashboard/DashBoard';
import CreateProfile from './components/profileFoms/CreateProfile';
import EditProfile from './components/profileFoms/EditProfile';
import AddExperience from './components/profileFoms/AddExperience';
import AddEducation from './components/profileFoms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
// utils
// Styles
import './App.css';
// Action creators
import { loadUser } from './actions';
// Redux related
import { Provider } from 'react-redux';
import store from './store';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import Donation from './components/payments/Donation';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/donate" component={Donation} />
                            <Route
                                exact
                                path="/profiles"
                                component={Profiles}
                            />
                            <Route
                                exact
                                path="/profiles/:id"
                                component={Profile}
                            />
                            <ProtectedRoutes
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <ProtectedRoutes
                                exact
                                path="/create-profile"
                                component={CreateProfile}
                            />
                            <ProtectedRoutes
                                exact
                                path="/edit-profile"
                                component={EditProfile}
                            />
                            <ProtectedRoutes
                                exact
                                path="/add-experience"
                                component={AddExperience}
                            />
                            <ProtectedRoutes
                                exact
                                path="/add-education"
                                component={AddEducation}
                            />
                            <ProtectedRoutes
                                exact
                                path="/posts"
                                component={Posts}
                            />
                            <ProtectedRoutes
                                exact
                                path="/posts/:id"
                                component={Post}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
