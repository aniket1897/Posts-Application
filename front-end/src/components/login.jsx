import React, { Component } from 'react'
import axios from 'axios';
export default class Login extends Component {

    state = {email:'',password:''};
    
    onEmailChange = (e) => {
        this.setState({
            email:e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/user/login',{
            email:this.state.email,
            password:this.state.password
        })
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('uid',response.data.uid);
        this.props.history.push('/posts');
    }

    render() {
        return (
            <div className="container">
            <h3>Login</h3>
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.onEmailChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.onPasswordChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}
