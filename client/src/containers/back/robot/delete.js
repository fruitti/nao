import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isUndefined from 'lodash/isUndefined';
import { Grid, Container, Header, Button, Icon, Segment } from 'semantic-ui-react';

import { RobotDelete, RobotGet } from '../../../actions';
import getRobotById from '../../../selectors/getRobotById'

class BackRobotDelete extends Component {
  
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.RobotGet();
  }
  
  handleDelete() {
    this.props.actions.RobotDelete(this.props.robot.id);
  }
  
  render() {
    return isUndefined(this.props.robot) ? (
        <Container fluid className="simple-padding">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1"><Icon name='reddit alien' />Impossible de supprimer ce robot</Header>
                <Button fluid color="green" as={Link} to="/admin/robot/">Retour</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      ) : (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='reddit alien' />Supprimer le robot : {this.props.robot.name}</Header>
              <Segment color="yellow">
                <Icon name="warning"/> Attention cette action est irréversible !
              </Segment>
              <Button.Group>
                <Button fluid color="green" as={Link} to="/admin/robot/">Retour</Button>
                <Button.Or text="ou"/>
                <Button fluid color="red" onClick={(e) => this.handleDelete()}>Supprimer</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}


BackRobotDelete.propTypes = {
  actions: PropTypes.shape({}),
  robot: PropTypes.any
};

function mapStateToProps(state,props) { // eslint-disable-line no-unused-vars
  return {
    robot: getRobotById(props.params.id)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    RobotDelete,
    RobotGet
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackRobotDelete);
