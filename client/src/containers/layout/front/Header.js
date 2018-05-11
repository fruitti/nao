import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon, Button, Confirm, Header } from 'semantic-ui-react';
import { Link } from 'react-router';

import { NaoShutdown } from '../../../actions';

class HeaderContainer extends Component {
  
  constructor() {
    super();
    this.state = {
      shutdown: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClickShutdown = this.handleClickShutdown.bind(this);
  }
  
  handleClickShutdown() {
    this.setState({
      shutdown: true
    });
  }
  
  handleCancel() {
    this.setState({
      shutdown: false
    });
  }
  
  handleConfirm() {
    this.setState({
      shutdown: false
    });
    this.props.actions.NaoShutdown();
  }
  
  
  render() {
    let batteryhtml = null;
    if (this.props.battery > 80) {
      batteryhtml = (<Icon fitted name="battery full" size="big" color="green"/>);
    } else if (this.props.battery > 60) {
      batteryhtml = (<Icon fitted name="battery high" size="big" color="olive"/>);
    } else if (this.props.battery > 40) {
      batteryhtml = (<Icon fitted name="battery medium" size="big" color="orange"/>);
    } else if (this.props.battery > 20) {
      batteryhtml = (<Icon name="battery low" size="big" color="red"/>);
    } else if (this.props.battery > 0) {
      batteryhtml = (<Icon name="battery empty" size="big" color="red"/>);
    } else {
      batteryhtml = (<Icon.Group size='big'>
        <Icon name='battery empty' />
        <Icon color='red' name='dont'/>
      </Icon.Group>);
    }
    
    return (
      <div>
        <Menu inverted fixed="top" borderless>
          <Menu.Item header>NAOBOX V2 - PILOTAGE DU ROBOT NAO</Menu.Item>
          <Menu.Item><div className="batteryPourcent">{this.props.battery}%</div>{batteryhtml}</Menu.Item>
          <Menu.Item>
            <Button inverted icon="power" color="red" onClick={this.handleClickShutdown}/>
            <Confirm
              content={(<Header as="h3">Voulez vous vraiment éteindre nao ?</Header>)}
              open={this.state.shutdown}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              cancelButton='Non'
              confirmButton="Oui"
            />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item><Button as={Link} to="admin" inverted icon="wrench"/></Menu.Item>
            <Menu.Item><Button as={Link} to="home" inverted icon="home"/></Menu.Item>
            <Menu.Item><Button as={Link} to="doc" inverted icon="book"/></Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

HeaderContainer.propTypes = {
  actions: PropTypes.shape({}),
  battery: PropTypes.string,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    battery: state.app.nao.battery
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    NaoShutdown
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
