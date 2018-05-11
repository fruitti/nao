import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import { GenerateField } from '../../../utils/InputGenerator';

const trim = value => value && value.trim();

class IndexForm extends Component {

  componentWillMount() {
    const initData = {
      username: '',
      password: '',
      rememberMe: false
    };
    this.props.initialize(initData);
  }

  render() {
    return (
    <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column textAlign="left" style={{marginTop: 20}}>
          <Segment>
            <Header textAlign="center" as="h1">NaoBOX - Administration</Header>
            <Form onSubmit={this.props.handleSubmit}>
              <Field normalize={trim} label="Nom de compte" name="username" type="text" placeholder="nao" component={GenerateField} required />
              <Field normalize={trim} label="Mot de passe" name="password" type="password" placeholder="*********" component={GenerateField} required />
              <Field label="Se souvenir de moi" name="rememberMe" type="checkbox" component={GenerateField} />
              <Button.Group fluid>
                <Button positive disabled={this.props.submitting}>Connexion</Button>
                <Button.Or text='ou' />
                <Button as={Link} to="/">Retour</Button>
              </Button.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}

IndexForm.propTypes = {
  current: PropTypes.object,
  initialize: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.any,
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

  return errors;
}

const form = reduxForm({
  form: 'LoginForm',
  validate
});

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(form(IndexForm));
