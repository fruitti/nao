import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from './loginForm';
import Footer from '../../layout/front/Footer';
import Loader from '../Loader';
import Notification from '../Notification';

import { LoginConnect, LoginToken } from '../../../actions';

class Login extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.actions.LoginToken();
  }

  onSubmit(data) {
    // try connexion
    this.props.actions.LoginConnect(data);
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit}/>
        <Loader />
        <Notification />
        <Footer />
      </div>
    );
  }
}


Login.propTypes = {
  actions: PropTypes.shape({})
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
    LoginConnect,
    LoginToken
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
