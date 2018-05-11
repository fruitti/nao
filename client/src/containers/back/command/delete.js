import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isUndefined from 'lodash/isUndefined';
import { Grid, Container, Header, Button, Icon, Segment } from 'semantic-ui-react';

import { CommandGet, CommandDelete } from '../../../actions';
import getCommandById from '../../../selectors/getCommandById'

class BackCommandDelete extends Component {
  
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.CommandGet();
  }
  
  handleDelete() {
    this.props.actions.CommandDelete({
      id: this.props.command.id,
      idRobot: this.props.idRobot
    });
  }
  
  render() {
    return isUndefined(this.props.command) ? (
        <Container fluid className="simple-padding">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1"><Icon name='desktop' />Impossible de supprimer cette commande</Header>
                <Button fluid color="green" as={Link} to={`/admin/robot/${this.props.idRobot}/command/`}>Retour</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      ) : (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='desktop' />Supprimer la commande : {this.props.command.name}</Header>
              <Segment color="yellow">
                <Icon name="warning"/> Attention cette action est irréversible !
              </Segment>
              <Button.Group>
                <Button fluid color="green" as={Link} to={`/admin/robot/${this.props.idRobot}/command/`}>Retour</Button>
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


BackCommandDelete.propTypes = {
  actions: PropTypes.shape({}),
  command: PropTypes.any,
  idRobot: PropTypes.any,
};

function mapStateToProps(state,props) { // eslint-disable-line no-unused-vars
  return {
    command: getCommandById(props.params.id)(state),
    idRobot: props.params.idRobot
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandGet,
    CommandDelete
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackCommandDelete);
