import React from 'react';
import { login, signup, startSignup, clearAuthState } from '../action/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = this.state;

    if (name && email && password && confirmPassword) {
      this.props.dispatch(startSignup());
      this.props.dispatch(signup(name, email, password, confirmPassword));
    }
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dialog">{error}</div>}
        <div className="field">
          <input
            type="string"
            placeholder="Name"
            required
            //ref={this.emailInputRef}/>
            onChange={this.handleNameChange}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            //ref={this.emailInputRef}/>
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            //ref={this.passwordInputRef} />
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder=" Confirm Password"
            required
            //ref={this.passwordInputRef} />
            onChange={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit} disabled={inProgress}>
            Signup
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Signup);
