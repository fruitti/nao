import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader, Modal, Header } from 'semantic-ui-react';

class Loading extends Component {
  render() {
    return (
      <Modal basic size="fullscreen" open={this.props.loading}>
        <Modal.Content>
          <Loader indeterminate>
            <Header as="h1" style={{color: 'white'}}>Chargement ...</Header>
          </Loader>
        </Modal.Content>
      </Modal>
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
