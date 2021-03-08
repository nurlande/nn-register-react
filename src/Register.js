import React from 'react';
import Alert from './Alert';
import CryptoAES from 'crypto-js/aes';
// import CryptoENC from 'crypto-js/enc-utf8'; 

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            inn: '',
            resStatus: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    encrypt = (text) => {
    return CryptoAES.encrypt(text, 'inn').toString();
    }

    register = (e) => {
        e.preventDefault();
        const data = {
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            inn: this.encrypt(this.state.inn)
        }
        this.sendPost(data);
    }

    sendPost = (data) => {

        fetch('http://localhost:8000/registrations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(res => res.json())
        .catch(err => this.setState ({resStatus: "Error"}))
        .then(data => {
            this.setState ({
                resStatus: "Success",
                fullName: '',
                phoneNumber: '',
                address: '',
                inn: '',
            });
        })
        .catch(err => this.setState ({resStatus: "Error"}));
    }
    
    render() {

        const alertBlock = (this.state.resStatus === "Success") ? 
            <Alert status="success" message="Form submitted successfully!"/> : 
            <Alert status="danger" message="Error! Something went wrong!"/>;

        return (
            <div>
                <h3 className="text-center mb-5">Application</h3>
                
                {(this.state.resStatus) && alertBlock}

                <form onSubmit={this.register} className="w-75 mx-auto mt-4">
                    <div className="form-group row">
                        <label className="col-sm-3">Full Name</label>
                        <input type="text" className="form-control col-sm-9" 
                        placeholder="Enter Full Name" name="fullName"
                        value={this.state.fullName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3">Phone</label>
                        <input type="text" className="form-control col-sm-9" 
                        placeholder="Enter Phone Number" name="phoneNumber"
                        value={this.state.phoneNumber} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3">Address</label>
                        <input type="text" className="form-control col-sm-9" 
                        placeholder="Enter Address" name="address"
                        value={this.state.address} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3">INN</label>
                        <input type="text" className="form-control col-sm-9" 
                        placeholder="Enter Inn" name="inn"
                        value={this.state.inn} onChange={this.handleChange}/>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;