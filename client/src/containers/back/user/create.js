import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from './form';
import { UserCreate } from '../../../actions';

class BackUserCreate extends Component {
  
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(data) {
    delete data.password2;
    // update data !
    this.props.actions.UserCreate(data);
  }
  
  render() {
    return (
        <div>
          <Form onSubmit={this.onSubmit} current={{}}/>
        </div>
      );
  }
}


BackUserCreate.propTypes = {
  actions: PropTypes.shape({})
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
    UserCreate
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackUserCreate);
