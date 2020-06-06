import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../action/auth';
import { searchUsers, clearSearchResults } from '../action/search';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  handleSearch = (e) => {
    const searchText = e.target.value;
    this.props.dispatch(searchUsers(searchText));
  };
  clearSearch = () => {
    const input = document.getElementById('knock');
    console.log('Hi', input);
    input.value = '';
    this.props.dispatch(clearSearchResults());
  };
  render() {
    const { auth, search } = this.props;
    const { isLoggedIn, user } = auth;
    return (
      <nav className="nav">
        <Link to="/">
          <div className="left-div">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </div>
        </Link>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" id="knock" onChange={this.handleSearch} />
          {search.showSearchResults === true && (
            <div className="search-results">
              <ul>
                {search.results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    <Link to={`/user/${user._id}`} onClick={this.clearSearch}>
                      <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {isLoggedIn && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{user.name}</span>
            </div>
          )}
          <div className="nav-links">
            <ul>
              {!isLoggedIn && (
                <li>
                  <Link to="/login">Log In </Link>
                </li>
              )}
              {isLoggedIn && <li onClick={this.logOut}>Log Out</li>}
              {!isLoggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.search,
  };
}
export default connect(mapStateToProps)(Navbar);
