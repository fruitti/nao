import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isNull from 'lodash/isNull';

import Header from './Header';
import Footer from './Footer';
import Loader from '../Loader';
import Notification from '../Notification';

import { LoginToken } from '../../../actions';
import NaoApi from '../../../services/naoClass';

class App extends Component {

  componentWillMount() {
    if (isNull(NaoApi.qis)) {
      this.props.router.push('home');
    }
    
    this.props.actions.LoginToken('layout');
  }

  render() {
    return (
      <div>
        <Header/>
        <Loader/>
        <Notification/>
        <div style={{marginLeft: 220, marginTop: 5}}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}


App.propTypes = {
  actions: PropTypes.shape({}),
  router: PropTypes.object
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
    LoginToken
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
