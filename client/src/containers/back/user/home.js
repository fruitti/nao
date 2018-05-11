import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Grid, Button, Header, Input, Icon, Container } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Link } from 'react-router';

import backUserFilter from '../../../selectors/backUserFilter';
import { UserGet, FilterSet } from '../../../actions';

class BackUserHome extends Component {
  
  componentWillMount() {
    this.props.actions.UserGet();
    this.search = debounce((e, data) => {
      this.props.actions.FilterSet(data.value);
    }, 300);
  }
  
  render() {
  
    const columns = [
      {
        header: 'Nom de compte',
        accessor: 'username',
        minWidth: 80
      }, {
        width: 280,
        sortable: false,
        header: '',
        accessor: 'id',
        render: row => (<Button.Group compact fluid widths="2">
          <Button content="Supprimer" icon="trash" color="red" as={Link} to={`/admin/user/delete/${row.row.id}`} />
        </Button.Group>)
      }
    ];
    
    return (
      <Container fluid className="simple-padding">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1"><Icon name='user' /> Gestion des utilisateurs</Header>
              <Button content="Ajouter" icon="add" color="purple" as={Link} to={`/admin/user/create`} />
              <div style={{padding: '5px 0 5px 0'}}>
                <Input icon="search" iconPosition="left" fluid placeholder="Recherche ...." onChange={this.search}/>
              </div>
              <ReactTable
                defaultPageSize="5"
                data={this.props.users}
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


BackUserHome.propTypes = {
  actions: PropTypes.shape({}),
  users: PropTypes.array
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    users: backUserFilter(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    UserGet,
    FilterSet
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackUserHome);
