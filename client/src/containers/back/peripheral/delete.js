import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isUndefined from 'lodash/isUndefined';
import { Grid, Container, Header, Button, Icon, Segment } from 'semantic-ui-react';

import { PeripheralGet, PeripheralDelete } from '../../../actions';
import getPeripheralById from '../../../selectors/getPeripheralById'

class BackPeripheralDelete extends Component {
  
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentWillMount() {
    this.props.actions.PeripheralGet();
  }
  
  handleDelete() {
    this.props.actions.PeripheralDelete(this.props.peripheral.id);
  }
  
  render() {
    return isUndefined(this.props.peripheral) ? (
        <Container fluid className="simple-padding">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1"><Icon name='desktop' />Impossible de supprimer ce péripherique</Header>
                <Button fluid color="green" as={Link} to="/admin/peripheral/">Retour</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      ) : (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='desktop' />Supprimer le péripherique : {this.props.peripheral.name}</Header>
              <Segment color="yellow">
                <Icon name="warning"/> Attention cette action est irréversible !
              </Segment>
              <Button.Group>
                <Button fluid color="green" as={Link} to="/admin/peripheral/">Retour</Button>
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


BackPeripheralDelete.propTypes = {
  actions: PropTypes.shape({}),
  peripheral: PropTypes.any
};

function mapStateToProps(state,props) { // eslint-disable-line no-unused-vars
  return {
    peripheral: getPeripheralById(props.params.id)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    PeripheralGet,
    PeripheralDelete
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackPeripheralDelete);
