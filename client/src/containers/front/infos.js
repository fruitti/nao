import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';

class Home extends Component {
  
  render() {
    return (
      <Container fluid>
        // TODO
      </Container>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
  robot: PropTypes.any,
  processing: PropTypes.any,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);