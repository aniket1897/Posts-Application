import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const App = () => {
    return (
        <div className="container">
            <div className="row">
                <h3>Welcome!</h3>
            </div>
            <Link to="login" className="btn btn-primary">Login</Link>
            <Link to="register" className="btn btn-success">Register</Link>
        </div>
    )
}

export default App;