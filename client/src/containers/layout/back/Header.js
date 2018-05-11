import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

import { LoginDisconnect } from '../../../actions';

class Header extends Component {
  
  constructor(){
    super();
    this.handleDeconnexion = this.handleDeconnexion.bind(this);
  }
  
  handleDeconnexion() {
    this.props.actions.LoginDisconnect();
  }
  
  render() {
    return (
      <Menu vertical fixed='left' inverted className="overflow-menu-admin">
        <Menu.Item as={Link} to="admin">
          <strong>
            NAOBOX V2 - Admin
          </strong>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='reddit alien' /> Gestion robot</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={Link} to="admin/robot">
              Visualisation
            </Menu.Item>
            <Menu.Item as={Link} to='admin/robot/create'>
              Ajouter
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='desktop' /> Gestion périphériques</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={Link} to="admin/peripheral">
              Visualisation
            </Menu.Item>
            <Menu.Item as={Link} to="admin/peripheral/create">
              Ajouter
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='user' /> Gestion utilisateurs</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={Link} to="admin/user">
              Visualisation
            </Menu.Item>
            <Menu.Item as={Link} to="admin/user/create">
              Ajouter
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item onClick={() => this.handleDeconnexion()}>
          Deconnexion
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Retour au client
        </Menu.Item>
      </Menu>
    );
  }
}


Header.propTypes = {
  actions: PropTypes.shape({})
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
    LoginDisconnect
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
