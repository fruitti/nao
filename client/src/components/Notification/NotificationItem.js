import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';

class NotificationItem extends React.Component {

  render() {
    let icon = '';
    switch (this.props.data.type) {
      case 'negative':
        icon = 'minus circle';
        break;
      case 'positive':
        setTimeout(() => this.props.handleClose(this.props.data), 3000);
        icon = 'check circle';
        break;
      case 'warning':
        setTimeout(() => this.props.handleClose(this.props.data), 10000);
        icon = 'warning circle';
        break;
      case 'info':
        setTimeout(() => this.props.handleClose(this.props.data), 5000);
        icon = 'info circle';
        break;
    }

    return (
      <Message
        icon
        positive = {this.props.data.type === 'positive'}
        negative = {this.props.data.type === 'negative'}
        warning = {this.props.data.type === 'warning'}
        info = {this.props.data.type === 'info'}
        onDismiss={(data) => this.props.handleClose(this.props.data)}
      >
        <Icon name={icon}/>
        <div dangerouslySetInnerHTML={{__html: this.props.data.message}}/>
      </Message>
    );
  }
}

NotificationItem.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func
};

export default NotificationItem;
