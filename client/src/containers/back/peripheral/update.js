import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
// import { Grid } from 'semantic-ui-react';

import Form from './form';
import { PeripheralGet, PeripheralUpdate } from '../../../actions';
import getPeripheralById from '../../../selectors/getPeripheralById';

class BackPeripheralUpdate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.PeripheralGet();
  }
  
  onSubmit(data) {
    // update data !
    this.props.actions.PeripheralUpdate(data);
  }
  
  render() {
    return isUndefined(this.props.peripheral) ? null : (
      <div>
        <Form onSubmit={this.onSubmit} current={this.props.peripheral}/>
      </div>
    );
  }
}


BackPeripheralUpdate.propTypes = {
  actions: PropTypes.shape({}),
  peripheral: PropTypes.any
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {
    peripheral: getPeripheralById(props.params.id)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    PeripheralGet,
    PeripheralUpdate
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackPeripheralUpdate);
