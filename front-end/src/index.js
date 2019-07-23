import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import AuthenticatedRoute from './authenticatedRoute';
import Posts from './components/posts';

const router = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <AuthenticatedRoute exact path="/posts" component={Posts} />
            <Route path="*" component={() => <h1>404 Not Found</h1>} />
        </Switch>
    </Router>
)
ReactDOM.render(router, document.getElementById('root'));

