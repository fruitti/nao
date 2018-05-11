import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Grid, Button, Header, Input, Icon, Container, Label } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Link } from 'react-router';

import backRobotFilter from '../../../selectors/backRobotFilter';
import { RobotGet, FilterSet } from '../../../actions';

class BackRobotHome extends Component {
  
  componentWillMount() {
    this.props.actions.RobotGet();
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
        minWidth: 90,
        header: 'MAC',
        accessor: 'mac_address'
      }, {
        minWidth: 80,
        header: 'IP',
        accessor: 'ip_address'
      }, {
        minWidth: 80,
        header: 'Couleur',
        accessor: 'color',
        render: row => (<div style={{height: '100%', width: '100%', backgroundColor: row.value}}>&nbsp;&nbsp;</div>)
      }, {
        minWidth: 80,
        header: 'Par défaut',
        accessor: 'default',
        render: row =>  row.value === '1' ? (<Container textAlign="center"><Label color="green">Oui</Label></Container>) : (<Container textAlign="center"><Label color="red">Non</Label></Container>)
      }, {
        width: 420,
        sortable: false,
        header: '',
        accessor: 'id',
        render: row => (<Button.Group compact fluid widths="3">
          <Button content="Commandes" icon="game" color="green" as={Link} to={`/admin/robot/${row.row.id}/command/`} />
          <Button content="Editer" icon="edit" color="teal" as={Link} to={`/admin/robot/update/${row.row.id}`} />
          <Button content="Supprimer" icon="trash" color="red" as={Link} to={`/admin/robot/delete/${row.row.id}`} />
        </Button.Group>)
      }
    ];
    
    return (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='reddit alien' /> Gestion des robots</Header>
              <Button content="Ajouter" icon="add" color="purple" as={Link} to={`/admin/robot/create`} />
              <div style={{padding: '5px 0 5px 0'}}>
                <Input icon="search" iconPosition="left" fluid placeholder="Recherche ...." onChange={this.search}/>
              </div>
              <ReactTable
                defaultPageSize="5"
                data={this.props.robots}
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


BackRobotHome.propTypes = {
  actions: PropTypes.shape({}),
  robots: PropTypes.array
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    robots: backRobotFilter(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    RobotGet,
    FilterSet
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackRobotHome);
