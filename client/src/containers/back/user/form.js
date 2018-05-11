import React, { Component } from 'react';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Container } from 'semantic-ui-react';

import { GenerateField } from '../../../utils/InputGenerator';

const trim = value => value && value.trim();

class UserForm extends Component {
  
  componentWillMount() {
    const initData = {
      id: this.props.current ? this.props.current.id : null,
      username: this.props.current ? this.props.current.username : null,
      password: this.props.current ? this.props.current.password : null,
      password2: this.props.current ? this.props.current.password2 : null,
    };
    this.props.initialize(initData);
  }
  
  render() {
    return isUndefined(this.props.current) ? (
        <Container fluid>
          <Header as="h1">Utilisateur innexistante</Header>
          <Button as={Link} to="/admin/user/">Retour</Button>
        </Container>
      ) : (
      <Container fluid>
        <Header as="h1"> { isEmpty(this.props.current) ? 'Ajout d\'un utilisateur' : 'Modification de l\'utilisateur : ' + this.props.current.username}</Header>
        <Form onSubmit={this.props.handleSubmit}>
          <Field normalize={trim} label="Nom de compte" name="username" type="text" placeholder="test" component={GenerateField} required />
          <Field normalize={trim} label="Mot de passe" name="password" type="password" component={GenerateField} required />
          <Field normalize={trim} label="Mot de passe" name="password2" type="password" component={GenerateField} required />
          <Button positive disabled={this.props.submitting}>Enregistrer</Button>
          <Button as={Link} to="/admin/user/">Retour</Button>
        </Form>
      </Container>
    );
  }
}

UserForm.propTypes = {
  current: PropTypes.object,
  initialize: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.any,
  params: PropTypes.any,
  pristine: PropTypes.any,
  handleSubmit: PropTypes.func
};

function validate(formProps) {
  const errors = {};
  
  if (!formProps.username) {
    errors.username = 'Entrez un nom de compte';
  }
  
  if (!formProps.password) {
    errors.password = 'Entrez un mot de passe';
  }
  
  if (!formProps.password2) {
    errors.password2 = 'Entrez un mot de passe';
  }
  
  if (formProps.password2 && formProps.password && formProps.password2 !== formProps.password) {
    errors.password = 'Mot de passe different';
    errors.password2 = 'Mot de passe different';
  }
  
  return errors;
}

const form = reduxForm({
  form: 'UserForm',
  validate
});

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(form(UserForm));
