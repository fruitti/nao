import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container, Header } from 'semantic-ui-react';

import { NaoConnect,NaoGetVersion, NaoSay, NaoBehavior, NaoRasta, ModeSet } from '../../actions';
import Pas from './pas';
import Action from './action';
import Robot from './robot';
import NaoApi from '../../services/naoClass';

class Home extends Component {
  
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(mode) {
    this.props.actions.ModeSet(mode);
  }
  
  render() {
      let html = null;
      switch (this.props.mode) {
        case 'pas':
          html = (<Pas/>);
          break;
        case 'robot':
          html = (<Robot/>);
          break;
        case 'action':
        default:
          html = (<Action/>);
          break;
      }
  
      return (
        <Container fluid>
          <Header as="h3">Documentation</Header>
          // TODO
        </Container>
      );
    }
}


Home.propTypes = {
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
    NaoRasta,
    ModeSet
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
