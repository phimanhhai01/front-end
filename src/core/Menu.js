import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#ffffff"}
};
const Menu = ({history}) => {
    return (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users" style={isActive(history, "/users")}>Users</Link>
            </li>
            <li className="nav-item">
                <Link 
                    to={"/post/create"}
                    style={isActive(history, "/post/create")}
                    className="nav-link"
                >
                    Create Post
                </Link>   
            </li>
            {!isAuthenticated() && (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Sign Up</Link>
                </li>
            </>
            )}
            {isAuthenticated() && (
            <>
                <li className="nav-item">
                    <Link 
                        to={"/findpeople"}
                        style={isActive(history, "/findpeople")}
                        className="nav-link"
                    >
                        Find friends
                    </Link>   
                </li>
                
                <li className="nav-item">
                    <Link 
                        to={`/user/${isAuthenticated().user._id}`}
                        style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                        className="nav-link"
                    >
                        {`${isAuthenticated().user.name}'s profile`}
                    </Link>   
                </li>
                <li className="nav-item">
                    <span 
                        className="nav-link" 
                        style={ isActive(history, "/signout"), { cursor: "pointer", color: "#fff" } }
                        onClick={() => signout(() => history.push("/"))}
                    >
                        Sign Out
                    </span>
                </li>
            </>
            )}
        </ul>

    </div>
    );
};
export default withRouter(Menu);