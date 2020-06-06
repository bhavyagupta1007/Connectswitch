import React, { Component } from 'react';
import { PostsList, FriendsList, Chat } from './';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;

    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && <FriendsList friends={friends} />}
        <Chat />
      </div>
    );
  }
}
export default Home;
