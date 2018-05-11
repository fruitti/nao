import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { Grid, Button, Header, Input, Icon, Container } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Link } from 'react-router';

import backCommandFilter from '../../../selectors/backCommandFilter';
import getRobotById from '../../../selectors/getRobotById';
import { CommandGet, FilterSet, NaoConnect } from '../../../actions';

class BackCommandHome extends Component {
  
  componentWillMount() {
    this.props.actions.CommandGet();
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
        minWidth: 150,
        header: 'Action',
        accessor: 'action'
      }, {
        width: 280,
        sortable: false,
        header: '',
        accessor: 'id',
        render: row => (<Button.Group compact fluid widths="2">
          <Button content="Editer" icon="edit" color="teal" as={Link} to={`/admin/robot/${this.props.idRobot}/command/update/${row.row.id}`} />
          <Button content="Supprimer" icon="trash" color="red" as={Link} to={`/admin/robot/${this.props.idRobot}/command/delete/${row.row.id}`} />
        </Button.Group>)
      }
    ];
    
    return (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='game' /> Gestion des commandes</Header>
              <Button content="Retour" color="green" as={Link} to={`/admin/robot/`} />
              <Button content="Ajouter" icon="add" color="purple" as={Link} to={`/admin/robot/${this.props.idRobot}/command/create`} />
              <div style={{padding: '5px 0 5px 0'}}>
                <Input icon="search" iconPosition="left" fluid placeholder="Recherche ...." onChange={this.search}/>
              </div>
              <ReactTable
                defaultPageSize="20"
                data={this.props.commands}
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


BackCommandHome.propTypes = {
  actions: PropTypes.shape({}),
  commands: PropTypes.array,
  robot: PropTypes.object,
  idRobot: PropTypes.string
};

function mapStateToProps(state, props) { // eslint-disable-line no-unused-vars
  return {
    commands: backCommandFilter(props.params.idRobot)(state),
    robot: getRobotById(props.params.idRobot)(state),
    idRobot: props.params.idRobot
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    CommandGet,
    FilterSet,
    NaoConnect
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackCommandHome);
