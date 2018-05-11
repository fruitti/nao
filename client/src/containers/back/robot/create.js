import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from './form';
import { RobotCreate } from '../../../actions';

class BackRoboCreate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(data) {
    // transform default to 1 / 0 in string
    data.default = data.default ? '1' : '0';
    // update data !
    this.props.actions.RobotCreate(data);
  }
  
  render() {
    return (
        <div>
          <Form onSubmit={this.onSubmit} current={{}}/>
        </div>
      );
  }
}


BackRoboCreate.propTypes = {
  actions: PropTypes.shape({})
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
    RobotCreate
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackRoboCreate);
