import { Link } from 'react-router-dom';
import React from 'react';
import DefaultProfile from '../images/person1.jpg';

class ProfileTabs extends React.Component {

    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row">
                   <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        <hr />
                        {followers.map((person, i) => {
                            return (
                            <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img 
                                                style={{borderRadius: "50%", border: "1px solid black"}}
                                                className="float-left mr-2"
                                                height="80px"
                                                width="80px"
                                                onError={i =>
                                                    (i.target.src = `${DefaultProfile}`)
                                                }
                                                src={`http://localhost:8080/user/photo/${person._id}`} 
                                                alt={person.name}
                                            />
                                            <div className="lead">
                                                {person.name}
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                        )})}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Following</h3>
                        <hr />
                        {following.map((person, i) => {
                            return (
                            <div key={i}>
                                <div className="row">
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img 
                                                style={{borderRadius: "50%", border: "1px solid black"}}
                                                className="float-left mr-2"
                                                height="80px"
                                                width="80px"
                                                onError={i =>
                                                    (i.target.src = `${DefaultProfile}`)
                                                }
                                                src={`http://localhost:8080/user/photo/${person._id}`} 
                                                alt={person.name}
                                            />  
                                            <div className="lead">
                                                {person.name}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Posts</h3>
                        <hr />
                        {posts.map((post, i) => {
                            return (
                            <div key={i}>
                                <div className="row">
                                        <Link to={`/post/${post._id}`}>
                                        
                                            <div className="lead">
                                                {post.title}
                                            </div>
                                        </Link>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTabs;