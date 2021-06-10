import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';
import { read } from '../user/apiUser';
import DefaultProfile from '../images/person1.jpg';
import DeleteUser from "./DeleteUser";
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import {listByUser} from "../post/apiPost";

class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts: []
        }
    }
    //check follow
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            //one id has many other ids
            return follower._id === jwt.user._id;
        });
        return match;
    };
    clickFollowButton = (callApi) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
        .then(data => {
            if(data.error){
                return this.setState({ error: data.error });
            }
            else {
                this.setState({ user: data, following: !this.state.following});
            }
        })
    };

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following: following });
                this.loadPosts(data._id);
            }
        });
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if(data.error) {
                console.log(data.error);
            }
            else {
                this.setState({ posts: data });
            }
        });
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }
    componentWillReceiveProps(props) {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    render() {
        const {redirectToSignin, user} = this.state
        if(redirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}`: DefaultProfile;
        return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
            <div className="row">
                <div className="col-md-4">
                <img className='img-thumbnail' style={{height: "200px", width: 'auto'}} src={photoUrl} alt={user.name} />
                </div>
                <div className="col-md-8">
                    <div className="lead mt-2">
                        <p>Hello {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                    </div>
                    {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id ? (
                        <div className="d-inline-block">
                            <Link 
                                className="btn btn-raised btn-info"
                                to={`/post/create`}
                            >
                                Create Post
                            </Link>

                            <Link 
                                className="btn btn-raised btn-success"
                                to={`/user/edit/${user._id}`}
                            >
                                Edit Profile
                            </Link>
            
                            <DeleteUser userId={user._id}/>
                        </div>
                    ) : (<FollowProfileButton 
                            following={this.state.following} 
                            onButtonClick={this.clickFollowButton}
                        />
                    )}
                </div>
                <hr />
            <div className="row">
                <div className="col md-12 mt-5 mb-5">
                    <hr />
                    <p className="lead">{user.about}</p>
                </div>
            </div>            
                <ProfileTabs 
                    following={this.state.user.following} 
                    followers={this.state.user.followers} 
                    posts={this.state.posts}
                />
            </div>
        </div>
        );
    }
};

export default Profile;