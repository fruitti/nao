import React, { Component } from 'react';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Container } from 'semantic-ui-react';

import { GenerateField } from '../../../utils/InputGenerator';

const trim = value => value && value.trim();

class CommandForm extends Component {
  
  componentWillMount() {
    const initData = {
      id: this.props.current ? this.props.current.id : null,
      name: this.props.current ? this.props.current.name : null,
      description: this.props.current ? this.props.current.description : null,
      action: this.props.current ? this.props.current.action : null,
      id_robot: this.props.current ? this.props.current.id_robot : null,
    };
    this.props.initialize(initData);
  }
  
  render() {
    
    let options = [
      {
        key: 'test',
        value: 'test',
        text: 'test',
      }
    ];
    
    forEach(this.props.behaviorList, (behavior) => {
      options.push({
        key: behavior,
        value: behavior,
        text: behavior
      });
    });
    
    return isUndefined(this.props.current) ? (
        <Container fluid>
          <Header as="h1">Commande innexistante</Header>
          <Button as={Link} to={`/admin/robot/${this.props.idRobot}/command/`}>Retour</Button>
        </Container>
      ) : (
      <Container fluid>
        <Header as="h1"> { isEmpty(this.props.current) ? 'Ajout d\'une commande' : 'Modification de la commande : ' + this.props.current.name}</Header>
        <Form onSubmit={this.props.handleSubmit}>
          <Field label="Nom" name="name" type="text" placeholder="Taï Tchi" component={GenerateField} required />
          <Field label="Description" name="description" type="textarea" placeholder="Le robot fait du Taï Tchi" component={GenerateField} required />
          <Field label="Action" name="action" type="select" options={options} component={GenerateField} required />
          <br/>
          <Button positive disabled={this.props.submitting}>Enregistrer</Button>
          <Button as={Link} to={`/admin/robot/${this.props.idRobot}/command/`}>Retour</Button>
        </Form>
      </Container>
    );
  }
}

CommandForm.propTypes = {
  current: PropTypes.object,
  initialize: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.any,
  params: PropTypes.any,
  pristine: PropTypes.any,
  behaviorList: PropTypes.any,
  idRobot: PropTypes.any,
  handleSubmit: PropTypes.func
};

function validate(formProps) {
  const errors = {};
  
  if (!formProps.name) {
    errors.name = 'Entrez un nom pour l\'action';
  }
  
  if (!formProps.action) {
    errors.action = 'Entrez une action';
  }
  
  if (!formProps.description) {
    errors.description = 'Entrez une description';
  }
  
  return errors;
}

const form = reduxForm({
  form: 'CommandForm',
  validate
});

function mapStateToProps(state, props) {
  return {
    behaviorList: state.entities.behaviorList
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(form(CommandForm));
