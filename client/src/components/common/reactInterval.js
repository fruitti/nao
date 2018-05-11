import React from 'react';
import PropTypes from 'prop-types';


class ReactInterval extends React.Component {
  
  constructor() {
    super();
    this.enabled = false;
    this.timeout = 1000;
    this.callback = () => {
      if (this.timer) {
        this.props.callback();
        this.start();
      }
    };
  
    this.start = () => {
      this.stop();
      this.timer = setTimeout(this.callback, this.props.timeout);
    };
  
    this.stop = () => {
      clearTimeout(this.timer);
      this.timer = null;
    };
  }
  
  componentDidMount() {
    if (this.props.enabled) {
      this.start();
    }
  }
  
  shouldComponentUpdate({timeout, callback, enabled}) {
    return (
      this.props.timeout !== timeout ||
      this.props.callback !== callback ||
      this.props.enabled !== enabled
    );
  }
  
  componentDidUpdate({enabled}) {
    if (this.props.enabled !== enabled) {
      if (this.props.enabled) {
        this.start();
      } else {
        this.stop();
      }
    }
  }
  
  componentWillUnmount() {
    this.stop();
  }
  
  render() {
    return false;
  }
}

ReactInterval.propTypes = {
  callback: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
  timeout: PropTypes.number
};

export default ReactInterval;