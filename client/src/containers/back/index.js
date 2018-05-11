import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { RobotGet, UserGet, CommandGet, PeripheralGet} from '../../actions'

class BackIndex extends Component {

  componentWillMount() {
    this.props.actions.RobotGet();
    this.props.actions.UserGet();
    this.props.actions.CommandGet();
    this.props.actions.PeripheralGet();
  }

  render() {
    return (
      <Container fluid>
        Partie d'administration
      </Container>
    );
  }
}


BackIndex.propTypes = {
  actions: PropTypes.shape({}),
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    RobotGet,
    UserGet,
    CommandGet,
    PeripheralGet
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackIndex);
