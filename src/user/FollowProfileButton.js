import React from 'react'
import { follow, unfollow } from './apiUser';


class FollowProfileButton extends React.Component  {
    followClick = () => {
        this.props.onButtonClick(follow);
    };
    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    }

    render() {
        return (
            <div className="d-inline-block mt-5">
                {
                    !this.props.following ? 
                    (
                        <button onClick={this.followClick} className="btn btn-success btn-raised">
                            Follow
                        </button>
                    ) : (
                        <button onClick={this.unfollowClick} className="btn btn-warning btn-raised">
                            Unfollow
                         </button>
                    )
                }
            </div>
        );
    }
} 

export default FollowProfileButton;