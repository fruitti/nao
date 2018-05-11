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

class PeripheraltForm extends Component {
  
  componentWillMount() {
    const initData = {
      id: this.props.current ? this.props.current.id : null,
      name: this.props.current ? this.props.current.name : null,
      description: this.props.current ? this.props.current.description : null,
      mac_address: this.props.current ? this.props.current.mac_address : null,
      ip_address: this.props.current ? this.props.current.ip_address : null
    };
    this.props.initialize(initData);
  }
  
  render() {
    return isUndefined(this.props.current) ? (
        <Container fluid>
          <Header as="h1">Periphérique innexistant</Header>
          <Button as={Link} to="/admin/peripheral/">Retour</Button>
        </Container>
      ) : (
      <Container fluid>
        <Header as="h1"> { isEmpty(this.props.current) ? 'Ajout d\'un périphérique' : 'Modification du périphérique :' + this.props.current.name}</Header>
        <Form onSubmit={this.props.handleSubmit}>
          <Field normalize={trim} label="Nom du périphérique" name="name" type="text" placeholder="PC-PAUL" component={GenerateField} required />
          <Field label="Description du périphérique" name="description" type="textarea" placeholder="paulette" component={GenerateField} required />
          <Field normalize={trim} label="Addresse MAC" name="mac_address" type="text" placeholder="00:1B:44:11:3A:B7" component={GenerateField} required />
          <Button positive disabled={this.props.submitting}>Enregistrer</Button>
          <Button as={Link} to="/admin/peripheral/">Retour</Button>
        </Form>
      </Container>
    );
  }
}

PeripheraltForm.propTypes = {
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
  
  if (!formProps.name) {
    errors.name = 'Entrez un nom de périphérique';
  }
  
  if (!formProps.description) {
    errors.description = 'Entrez une description';
  }
  
  if (!formProps.mac_address) {
    errors.mac_address = 'Entrez une addresse mac';
  }
  
  return errors;
}

const form = reduxForm({
  form: 'PeripheraltForm',
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(form(PeripheraltForm));
