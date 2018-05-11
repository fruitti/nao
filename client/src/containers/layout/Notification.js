import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NotificationDelete } from '../../actions';
import NotificationItem from '../../components/Notification/NotificationItem';

class Notification extends Component {

  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(item) {
    this.props.actions.NotificationDelete(item);
  }

  render() {
    let items = this.props.notifications.map((data) => {
      return (<NotificationItem key={data.id} data={data} handleClose={this.handleClose} />);
    });
    return (
      <div className="notifications">
        {items}
      </div>
    );
  }
}

Notification.propTypes = {
  notifications: PropTypes.array,
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    NotificationDelete
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
