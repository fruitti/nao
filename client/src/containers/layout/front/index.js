import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';

import Header from './Header';
import Footer from './Footer';
import Loader from '../Loader';
import Notification from '../Notification';
import ReactInterval from '../../../components/common/reactInterval';
import getRobotDefault from '../../../selectors/getRobotDefault';
import { NaoConnect, RobotGet, NaoGetBattery } from '../../../actions';
import NaoApi from '../../../services/naoClass';

class App extends Component {
  
  componentWillMount() {
    this.props.actions.RobotGet();
  }
    
  componentDidUpdate() {
    if (!isUndefined(this.props.defaultRobot) && !NaoApi.connected) {
      this.props.actions.NaoConnect(this.props.defaultRobot.ip_address);
    }
  }
  
  render() {
    return (
      <div>
        <Header/>
        <Loader/>
        <Notification/>
        <div className="padding-top">
          <ReactInterval timeout={20000} enabled={true} callback={() => this.props.actions.NaoGetBattery()} />
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}


App.propTypes = {
  actions: PropTypes.shape({}),
  defaultRobot: PropTypes.object
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    defaultRobot: getRobotDefault(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    NaoConnect,
    RobotGet,
    NaoGetBattery
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
