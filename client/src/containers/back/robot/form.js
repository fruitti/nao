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

class RobotForm extends Component {
  
  componentWillMount() {
    const initData = {
      id: this.props.current ? this.props.current.id : null,
      name: this.props.current ? this.props.current.name : null,
      mac_address: this.props.current ? this.props.current.mac_address : null,
      ip_address: this.props.current ? this.props.current.ip_address : null,
      color: this.props.current ? this.props.current.color : null,
      default: this.props.current ? this.props.current.default === '1' : null
    };
    this.props.initialize(initData);
  }
  
  render() {
    return isUndefined(this.props.current) ? (
        <Container fluid>
          <Header as="h1">Robot innexistant</Header>
          <Button as={Link} to="/admin/robot/">Retour</Button>
        </Container>
      ) : (
      <Container fluid>
        <Header as="h1"> { isEmpty(this.props.current) ? 'Ajout d\'un robot' : 'Modification du robot :' + this.props.current.name}</Header>
        <Form onSubmit={this.props.handleSubmit}>
          <Field normalize={trim} label="Nom du robot" name="name" type="text" placeholder="paulette" component={GenerateField} required />
          <Field normalize={trim} label="Addresse MAC" name="mac_address" type="text" placeholder="00:1B:44:11:3A:B7" component={GenerateField} required />
          <Field normalize={trim} label="Couleur" name="color" type="text" placeholder="#FFFFFF" component={GenerateField} required />
          <Field label="Robot pas defaut" name="default" type="checkbox" component={GenerateField} />
          <Button positive disabled={this.props.submitting}>Enregistrer</Button>
          <Button as={Link} to="/admin/robot/">Retour</Button>
        </Form>
      </Container>
    );
  }
}

RobotForm.propTypes = {
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
    errors.name = 'Entrez un nom au robot';
  }
  
  if (!formProps.mac_address) {
    errors.mac_address = 'Entrez une adresse mac';
  }
  
  if (!formProps.color) {
    errors.color = 'Entrez une couleur';
  }
  
  return errors;
}

const form = reduxForm({
  form: 'RobotForm',
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(form(RobotForm));
