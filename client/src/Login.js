import React, { Component } from "react";
import './login.css';

class LoginModal extends Component{
  constructor(props){
    super(props);

    this.state = {
        username: "",
        password: "",
        name: "",
        alias: "",
        confirm_password: "",
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.registerUser = this.registerUser.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
  }
 
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const user = {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        alias: this.state.alias,
        confirm_password: this.state.confirm_password,
      };
    console.log('Send this in a POST request:', user)
    this.handleClearForm(event);
}

  registerUser(event) {
    event.preventDefault();

    if (this.state.password !== this.state.confirm_password) {
        alert('Passwords don\'t match');
        return;
    }

    let userData = {};
    userData.name = this.state.name;
    userData.alias = this.state.alias;
    userData.username = this.state.username;
    userData.password = this.state.password;
    console.log('New user data', JSON.stringify(userData));


    fetch(`/auth/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));

    this.setState({
        username: "",
        password: "",
        name: "",
        alias: "",
        confirm_password: ""
    });
  }

  handleClearForm(event) {
    event.preventDefault();
  this.setState({
    username: "",
    password: "",
    name: "",
    alias: "",
    confirm_password: ""
  });
}

  render() {
    return(
        <div className="modal fade" id="modalLRForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog cascading-modal" role="document">
            <div className="modal-content">
                <div className="modal-c-tabs">
                    <ul className="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#panel7" role="tab"><i className="fa fa-user mr-1"></i> Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#panel8" role="tab"><i className="fa fa-user-plus mr-1"></i> Register</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade in show active" id="panel7" role="tabpanel">
                            <div className="modal-body mb-1">
                                <form className="login-form" autocomplete="off" id="login_form" action="http://localhost:5000/auth/login" method="post" onSubmit={(event => this.onSubmit(event))}>
                                <div className="md-form form-sm mb-5">
                                    <i className="fa fa-envelope prefix"></i>
                                    <input type="email" id="login_username" className="form-control form-control-sm validate" 
                                    name="username" autocomplete="new-password" value={this.state.username} onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="login_username">Your email</label>
                                </div>
    
                                <div className="md-form form-sm mb-4">
                                    <i className="fa fa-lock prefix"></i>
                                    <input type="password" id="login_password" className="form-control form-control-sm validate"
                                    name="password" autocomplete="new-password" value={this.state.password} onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="login_password">Your password</label>
                                </div>
                                <div className="text-center mt-2">
                                    <button className="btn btn-info" >Log in <i className="fa fa-sign-in ml-1"></i></button>
                                </div>
                                </form>
                            </div>
                            
                            <div className="modal-footer">
                                <div className="options text-center text-md-right mt-1">
                                    <p>Forgot <a href="" className="blue-text">Password?</a></p>
                                </div>
                                <button type="button" className="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                            </div>
    
                        </div>
                       
    
                       
                        <div className="tab-pane fade" id="panel8" role="tabpanel">
    
                         
                            <div className="modal-body">
                                <form onSubmit={(this.registerUser)} className="login-form" autocomplete="off" >
                                <div className="md-form form-sm mb-5">
                                    <i className="fa fa-user prefix"></i>
                                    <input type="text" id="name" className="form-control form-control-sm validate"
                                    name="name" autocomplete="new-password" value={this.state.name} onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="name">Your Full Name</label>
                                </div>

                               <div className="md-form form-sm mb-5">
                                    <i className="fa fa-user-secret prefix"></i>
                                    <input type="text" id="alias" className="form-control form-control-sm validate"
                                    name="alias" autocomplete="new-password" value={this.state.alias} onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="alias">Create An Alias</label>
                                </div>

                                <div className="md-form form-sm mb-5">
                                    <i className="fa fa-envelope prefix"></i>
                                    <input type="email" id="username" className="form-control form-control-sm validate"
                                    name="username" autocomplete="new-password" value={this.state.username} onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="username">Your email</label>
                                </div>
    
                                <div className="md-form form-sm mb-5">
                                    <i className="fa fa-lock prefix"></i>
                                    <input type="password" id="password" className="form-control form-control-sm validate"
                                    name="password" autocomplete="new-password" onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="password">Your password</label>
                                </div>
    
                                <div className="md-form form-sm mb-4">
                                    <i className="fa fa-lock prefix"></i>
                                    <input type="password" id="confirm_password" className="form-control form-control-sm validate"
                                    name="confirm_password" autocomplete="new-password" value={this.state.confirm_password} onChange={this.onChange}/>
                                    <label data-error="wrong" data-success="right" htmlFor="confirm_password">Confirm password</label>
                                </div>
    
                                <div className="text-center form-sm mt-2">
                                    <button className="btn btn-info" onSubmit={this.handleFormSubmit}> Sign up <i className="fa fa-sign-in ml-1"></i></button>
                                </div>
                                </form>
                            </div>
                            
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        
                    </div>
    
                </div>
            </div>
            
        </div>
    </div>
    );
  }
}



export default LoginModal;