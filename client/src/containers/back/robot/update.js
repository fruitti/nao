import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
// import { Grid } from 'semantic-ui-react';

import Form from './form';
import { RobotGet, RobotUpdate } from '../../../actions';
import getRobotById from '../../../selectors/getRobotById';

class BackRobotUpdate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.RobotGet();
  }
  
  onSubmit(data) {
    // transform default to 1 / 0 in string
    data.default = data.default ? '1' : '0';
    // update data !
    this.props.actions.RobotUpdate(data);
  }
  
  render() {
    return isUndefined(this.props.robot) ? null : (
      <div>
        <Form onSubmit={this.onSubmit} current={this.props.robot}/>
      </div>
    );
  }
}


BackRobotUpdate.propTypes = {
  actions: PropTypes.shape({}),
  robot: PropTypes.any
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {
    robot: getRobotById(props.params.id)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    RobotGet,
    RobotUpdate
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackRobotUpdate);
