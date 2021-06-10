import React from 'react';
import { signup } from "../auth/index";
import {Link} from "react-router-dom";
class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
        
    };
    handleChange = (name) => (event) => {
        this.setState({error: "", open: false});
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = (event) => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = { 
            name,
            email,
            password
        };
        signup(user).then(data => {
            if(data.error){
                this.setState({ error: data.error });
            }
            else {
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
            }
        });
    };
    
    signUpForm = (name, email, password) => {
        return (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input 
                            onChange={this.handleChange("name")} 
                            type="text" 
                            className="form-control" 
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange={this.handleChange("email")} 
                            type="email" 
                            className="form-control" 
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange={this.handleChange("password")} 
                            type="password" 
                            className="form-control" 
                            value={password}
                        />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
        )
    }
    render() {
        const { error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div
                    className="alert alert-danger"
                    style={ { display: error ? "" : "none" } }
                >
                    {error}
                </div>
                <div
                    className="alert alert-info"
                    style={ { display: open ? "" : "none" } }
                >
                    A new account has been successfully created. Please <Link to="/signin">Sign in</Link>
                </div>

                {this.signUpForm()}
            </div>
        );
    }
}

export default Signup;