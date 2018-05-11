import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isUndefined from 'lodash/isUndefined';
import { Grid, Container, Header, Button, Icon, Segment } from 'semantic-ui-react';

import { UserGet, UserDelete } from '../../../actions';
import getUserById from '../../../selectors/getUserById'

class BackUserDelete extends Component {
  
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.UserGet();
  }
  
  handleDelete() {
    this.props.actions.UserDelete(this.props.user.id);
  }
  
  render() {
    return isUndefined(this.props.user) ? (
        <Container fluid className="simple-padding">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1"><Icon name='desktop' />Impossible de supprimer ce péripherique</Header>
                <Button fluid color="green" as={Link} to="/admin/command/">Retour</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      ) : (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='desktop' />Supprimer le péripherique : {this.props.user.name}</Header>
              <Segment color="yellow">
                <Icon name="warning"/> Attention cette action est irréversible !
              </Segment>
              <Button.Group>
                <Button fluid color="green" as={Link} to="/admin/command/">Retour</Button>
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


BackUserDelete.propTypes = {
  actions: PropTypes.shape({}),
  user: PropTypes.any
};

function mapStateToProps(state,props) { // eslint-disable-line no-unused-vars
  return {
    user: getUserById(props.params.id)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    UserGet,
    UserDelete
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackUserDelete);
