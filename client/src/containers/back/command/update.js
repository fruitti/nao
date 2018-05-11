import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
// import { Grid } from 'semantic-ui-react';
import NaoApi from '../../../services/naoClass';

import Form from './form';
import { CommandGet, CommandUpdate, NaoConnect, NaobehaviorList } from '../../../actions';
import getCommandById from '../../../selectors/getCommandById';

class BackCommandUpdate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.CommandGet();
    this.props.actions.NaobehaviorList();
  }
  
  onSubmit(data) {
    // update data !
    this.props.actions.CommandUpdate(data);
  }
  
  render() {
    return isUndefined(this.props.command) ? null : (
      <div>
        <Form onSubmit={this.onSubmit} current={this.props.command} idRobot={this.props.idRobot}/>
      </div>
    );
  }
}


BackCommandUpdate.propTypes = {
  actions: PropTypes.shape({}),
  command: PropTypes.any
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {
    command: getCommandById(props.params.id)(state),
    idRobot: props.params.idRobot
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandGet,
    CommandUpdate,
    NaoConnect,
    NaobehaviorList
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackCommandUpdate);
