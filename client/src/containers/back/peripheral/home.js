import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Grid, Button, Header, Input, Icon, Container } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Link } from 'react-router';

import backPeripheralFilter from '../../../selectors/backPeripheralFilter';
import { PeripheralGet, FilterSet } from '../../../actions';

class BackPeripheralHome extends Component {
  
  componentWillMount() {
    this.props.actions.PeripheralGet();
    this.search = debounce((e, data) => {
      this.props.actions.FilterSet(data.value);
    }, 300);
  }
  
  render() {
  
    const columns = [
      {
        header: 'Nom',
        accessor: 'name',
        minWidth: 80
      }, {
        header: 'Description',
        accessor: 'description',
        minWidth: 80
      }, {
        minWidth: 90,
        header: 'MAC',
        accessor: 'mac_address'
      }, {
        minWidth: 80,
        header: 'IP',
        accessor: 'ip_address'
      }, {
        width: 280,
        sortable: false,
        header: '',
        accessor: 'id',
        render: row => (<Button.Group compact fluid widths="2">
          <Button content="Editer" icon="edit" color="teal" as={Link} to={`/admin/peripheral/update/${row.row.id}`} />
          <Button content="Supprimer" icon="trash" color="red" as={Link} to={`/admin/peripheral/delete/${row.row.id}`} />
        </Button.Group>)
      }
    ];
    
    return (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='desktop' /> Gestion des périphériques</Header>
              <Button content="Ajouter" icon="add" color="purple" as={Link} to={`/admin/peripheral/create`} />
              <div style={{padding: '5px 0 5px 0'}}>
                <Input icon="search" iconPosition="left" fluid placeholder="Recherche ...." onChange={this.search}/>
              </div>
              <ReactTable
                defaultPageSize="5"
                data={this.props.peripherals}
                columns={columns}
                defaultSorting={[{id: 'name', asc: true}]}
                previousText="Précédent"
                nextText="Suivant"
                loadingText="Chargement..."
                noDataText="Aucune données"
                pageText="Page"
                ofText="sur"
                rowsText="lignes"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}


BackPeripheralHome.propTypes = {
  actions: PropTypes.shape({}),
  peripherals: PropTypes.array
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    peripherals: backPeripheralFilter(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    PeripheralGet,
    FilterSet
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackPeripheralHome);
