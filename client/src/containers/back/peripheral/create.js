import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from './form';
import { PeripheralCreate } from '../../../actions';

class BackPeripheralCreate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(data) {
    // update data !
    this.props.actions.PeripheralCreate(data);
  }
  
  render() {
    return (
        <div>
          <Form onSubmit={this.onSubmit} current={{}}/>
        </div>
      );
  }
}


BackPeripheralCreate.propTypes = {
  actions: PropTypes.shape({})
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
    PeripheralCreate
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackPeripheralCreate);
