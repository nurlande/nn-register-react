import React from 'react';
import CryptoAES from 'crypto-js/aes';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            users: null
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    encrypt = (text) => {
        return CryptoAES.encrypt(text, 'user').toString();
    }

    login = (e) => {
        e.preventDefault();
        let user = (this.state.users) ? this.state.users.filter(u=>u.userName === this.state.username)[0] : {userName: "admin", password: "1111"};
        let username = this.state.username;
        let password = this.state.password;
        console.log(user);
        if(username === user.userName && password === user.password) {
            localStorage.setItem("user", this.encrypt(username));
            window.location.href = "/admin";
        } else {
            console.log("error :" + username);
        }
    }

    getUsers = () => {
        fetch('http://localhost:8000/users/?format=json')
            .then((res) => res.json())
            .catch((err) => console.log(err))
            .then(data => {
                (data.length > 0) ? this.setState({users: data}) : console.log(data);
            });
    }

    render() {
        return (
            <div className="login-page mx-auto">
                <h1 className="text-center my-5">Login</h1>
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        placeholder="Username" name="username"
                        value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" 
                        placeholder="Password" name="password"
                        value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;