import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from './form';
import { CommandCreate, NaobehaviorList } from '../../../actions';

class BackCommandCreate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.NaobehaviorList();
  }
  
  onSubmit(data) {
    // update data !
    data.id_robot = this.props.idRobot;
    this.props.actions.CommandCreate(data);
  }
  
  render() {
    return (
        <div>
          <Form onSubmit={this.onSubmit} current={{}} idRobot={this.props.idRobot}/>
        </div>
      );
  }
}


BackCommandCreate.propTypes = {
  actions: PropTypes.shape({}),
  idRobot: PropTypes.string
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {
    idRobot: props.params.idRobot
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandCreate,
    NaobehaviorList
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackCommandCreate);
