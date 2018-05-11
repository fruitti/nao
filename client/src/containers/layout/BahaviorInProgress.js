import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader, Modal, Button, Icon } from 'semantic-ui-react';

import { BehaviorSetLoading, NaoStopAllBehavior } from '../../actions';

class BehaviorInProgress extends Component {
  
  constructor(){
    super();
    this.stop = this.stop.bind(this);
  }
  
  stop() {
    this.props.actions.BehaviorSetLoading(false);
    this.props.actions.NaoStopAllBehavior();
  }
  
  render() {
    return (
      <Modal size="fullscreen" open={this.props.processing}>
        <Modal.Header>
          <Icon name="spinner" loading />
          Action en cours
        </Modal.Header>
        <Modal.Content>
          <p>Vous pouvez attendre la fin ou la stopper directement !</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive icon='checkmark' labelPosition='right' content='Stopper' onClick={this.stop} />
        </Modal.Actions>
      </Modal>
    );
  }
}

BehaviorInProgress.propTypes = {
  processing: PropTypes.bool,
  actions: PropTypes.any
};

function mapStateToProps(state) {
  return {
    processing: state.app.nao.processing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    BehaviorSetLoading,
    NaoStopAllBehavior
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BehaviorInProgress);
