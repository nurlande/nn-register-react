import React from 'react';
import Alert from './Alert';

import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8'; 

class Registrations extends React.Component {
    constructor() {
        super();
        this.state = {
            registrations: null
        }
    }
    componentDidMount() {
        this.getRegistrations();
    }


    decrypt = (encryptedText) => {
        let inn = CryptoAES.decrypt(encryptedText.toString(), 'inn');
        return inn.toString(CryptoENC);
    }

    getRegistrations = () => {
        fetch('http://localhost:8000/registrations/?format=json')
            .then((res) => res.json())
            .catch((err) => console.log(err))
            .then(data => {
                (data.length) ? this.setState({registrations: data}) : console.log(data); 
            });
    }

    render() {
        const itemList = (this.state.registrations) &&
        this.state.registrations.map((item, i)=> 
            <tr key={i}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>{this.decrypt(item.inn)}</td>
            </tr>)
        return (
            <div>
                <h6>List of Registrations</h6>
                {(!this.state.registrations) ? 
                <Alert status="info" message="No data found!"/>
                    : 
                    <div className="table-responsive-xl">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>INN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList}
                            </tbody>
                        </table>
                    </div>
                }
                
            </div>
        )
    }
}

export default Registrations;