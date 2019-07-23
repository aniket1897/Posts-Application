import React, { Component } from 'react'
import axios from 'axios';

export default class Register extends Component {

    state = {name:'',email:'',password:''};

    onNameChange = (e) => {
        this.setState({
            name:e.target.value
        })
    }

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
        axios.post('http://localhost:3000/api/user/register',{
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        });
        alert("User registered!!");
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="container">
                <h3>Register</h3>
                <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter full name" value={this.state.name} onChange={this.onNameChange}/>
                    </div>
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
