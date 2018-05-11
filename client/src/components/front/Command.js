import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class Command extends React.Component {
  
  render() {
    return (
      <Button style={{margin: 5}} size="massive" onClick={(e) => this.props.onClick(this.props.data.action) }>{this.props.data.name}</Button>
    );
  }
  
}

Command.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.any
};

export default Command;
