import React from 'react';
import Registrations from './Registrations';
import {Redirect} from 'react-router-dom';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            user: localStorage.getItem("user")
        }
    }
    componentDidMount () {
        this.setState({
            user: localStorage.getItem("user")
        })
    }

    render() {
        return (
            (!this.state.user) ? 
            <Redirect to="/login" /> :
            <div>
                <h1 className="header text-center">Admin</h1>
                <Registrations />
            </div>
        )
    }
}

export default Admin;