import React from 'react';
import Post from '../post/Posts';


const Home = () => {
    return(
        <div>
            <div className="container fluid">
                <h2>Home</h2>
            <p className="lead">Welcome</p>

            </div>
             <div className="container">
                <Post />
            </div>
        </div>
    );
};

export default Home;