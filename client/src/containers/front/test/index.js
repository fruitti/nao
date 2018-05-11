import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container } from 'semantic-ui-react';

import { NaoConnect,NaoGetVersion, NaoSay, NaoBehavior, NaoRasta } from '../../../actions';

class Home extends Component {
  
  render() {
    return (
      <Container>
        <button onClick={() => this.props.actions.NaoRasta(10)}>NaoRasta</button>
        <button onClick={() => this.props.actions.NaoGetVersion()}>recuperer la version</button>
        <input onBlur={(e) => this.props.actions.NaoSay(e.target.value)}/>
      </Container>
    );
  }
}


Home.propTypes = {
  actions: PropTypes.shape({}),
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
