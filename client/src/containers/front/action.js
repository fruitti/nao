import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Menu,Segment, Container } from 'semantic-ui-react';

import BehaviorInProgress from '../layout/BahaviorInProgress';
import { CommandGet, NaoBehavior } from '../../actions';
import Command from '../../components/front/Command';
import getCommandByRobotId from '../../selectors/getCommandByRobotId';

class Home extends Component {
  
  constructor() {
    super();
    
    this.onClickCommand = this.onClickCommand.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.CommandGet();
  }
  
  onClickCommand(action) {
    this.props.actions.NaoBehavior(action);
  }
  
  render() {
    let commandHtml = this.props.commands.map( (command) => {
      return <Command key={command.id} data={command} onClick={this.onClickCommand}/>;
    });
    
    return (
      <Container fluid>
        <BehaviorInProgress />
        {commandHtml}
      </Container>
    );
  }
}


Home.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
  commands: PropTypes.any
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    mode: state.app.mode,
    commands: getCommandByRobotId(state.app.default)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandGet,
    NaoBehavior
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
