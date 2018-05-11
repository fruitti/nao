import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';

import { NaoConnect,NaoGetVersion, NaoSay, NaoBehavior, NaoRasta } from '../../actions';

class Robot extends Component {
  
  render() {
    return (
      <Container fluid>
        <h1>Pour changer de robot</h1>
        <p>
          La seule méthode possible pour l'instant est de changer le robot par default dans l'administration et de ctrl+f5 l'application
        </p>
      </Container>
    );
  }
}

Robot.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    mode: state.app.mode
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    NaoConnect,
    NaoGetVersion,
    NaoSay,
    NaoBehavior,
    NaoRasta
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Robot);
