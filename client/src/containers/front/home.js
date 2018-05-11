import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container, Header } from 'semantic-ui-react';

import { NaoConnect,NaoGetVersion, NaoSay, NaoBehavior, NaoRasta, ModeSet } from '../../actions';
import Pas from './pas';
import Action from './action';
import Infos from './infos';
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
        case 'infos':
          html = (<Infos/>);
          break;
        case 'action':
        default:
          html = (<Action/>);
          break;
      }
  
      return (
        <Container fluid>
          <Menu attached='top' tabular>
            <Menu.Item name='pasapas' active={this.props.mode === 'pas'} content="Controle pas à pas" onClick={() => this.handleChange('pas')}/>
            <Menu.Item name='action' active={this.props.mode === 'action'} content="Actions" onClick={() => this.handleChange('action')}/>
            <Menu.Item name='action' active={this.props.mode === 'robot'} content="Changer de robot" onClick={() => this.handleChange('robot')}/>
            <Menu.Item name='infos' active={this.props.mode === 'infos'} content="Infos" onClick={() => this.handleChange('infos')}/>
          </Menu>
          <Segment attached='bottom'>
            {html}
          </Segment>
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
