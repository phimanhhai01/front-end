import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/person1.jpg';
import { list } from './apiUser';
class Users extends React.Component {
    constructor(){
        super();
        this.state = {
            users: []
        };
    }
    componentDidMount(){
        list().then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({users: data});
            }
        });
    }
    renderUsers = (users) => {
        return (
        <div className="row">
            {users.map((user,i) => (
                <div className="card col-md-4"  key={i}>
                <img 
                    className='img-thumbnail' 
                    style={{height: "400px", width: 'auto'}} 
                    src={`http://localhost:8080/user/photo/${user._id}`} 
                    onError={i => (i.target.src = DefaultProfile)}
                    alt={user.name} 
                />

                <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                    {user.email}
                </p>
                <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">View Profile</Link>
                </div>
            </div>
            ))}
        </div>
        );
    }

    render() {
        const {users} = this.state;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    };
}

export default Users;